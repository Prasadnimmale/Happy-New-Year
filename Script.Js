function showFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let particles = [];
  
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: Math.random() * 6 - 3,
          y: Math.random() * 6 - 3,
        };
        this.alpha = 1;
      }
  
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
  
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
          particle.draw();
        }
      });
  
      requestAnimationFrame(animate);
    }
  
    function createFireworks(x, y) {
      const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33c4"];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }
  
    canvas.addEventListener("click", (e) => createFireworks(e.clientX, e.clientY));
    createFireworks(canvas.width / 2, canvas.height / 2);
    animate();
  }