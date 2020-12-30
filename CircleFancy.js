class FancyCircle{
  constructor(middleX,middleY,base_radius,color_,detail=20){
    this.mx = middleX;
    this.my = middleY;
    this.r = base_radius;
    this.detail = detail;
    this.color = color(color_);
    this.alpha = 300;
    this.inside_circles = [] 
  }
  
  draw(){
    push();
    // this.color.setAlpha(this.alpha)
    fill(this.color);
    // ellipse(this.mx,this.my,10,10)
    // noFill()
    noStroke()
    beginShape();
    let angle = 0;
    let step = map(this.detail,0,30,0.5,0.05);
    for(angle = -step ;angle <= TWO_PI;angle+=step){
      let n = noise(sin(angle+this.r*0.05),cos(abs(angle-PI)+frameCount*0.01),this.my)*20*2;
      let x = this.mx+cos(angle)*(this.r + n);
      let y = this.my + sin(angle)*(this.r +n );
      curveVertex(x,y)
    }
    
    endShape();
    pop()
  }
  
  update(){
    this.r += 0.4;
    this.alpha += -1
    // this.detail += -0.01
  }
}