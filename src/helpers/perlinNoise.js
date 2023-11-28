
export function generatePerlinNoise(width, height, scale) {
    
    var noise = new Array(width);

    for (var i = 0; i < width; i++) {
      noise[i] = new Array(height);
      for (var j = 0; j < height; j++) {
        noise[i][j] = Math.random();
      }
    }

    for (var i = 0; i < 1; i++) {
      noise = smoothNoise();
    }

    return noise;

    function smoothNoise() {
        var smoothedNoise = new Array(width);

        for (var i = 0; i < width; i++) {
            smoothedNoise[i] = new Array(height);
            for (var j = 0; j < height; j++) {
                var corners = (noise[(i - 1 + width) % width][(j - 1 + height) % height] +
                            noise[(i + 1) % width][(j - 1 + height) % height] +
                            noise[(i - 1 + width) % width][(j + 1) % height] +
                            noise[(i + 1) % width][(j + 1) % height]) / 16;      
            
                var sides = (noise[(i - 1 + width) % width][j] +
                        noise[(i + 1) % width][j] +
                        noise[i][(j - 1 + height) % height] +
                        noise[i][(j + 1) % height]) / 8;
    
                var center = noise[i][j] / 4;
        
                smoothedNoise[i][j] = corners + sides + center;     
            }
        }

        return smoothedNoise;
    }
  }