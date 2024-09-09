class Display {
  constructor(_displaySize, _pixelSize) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.initColor = color(220, 220, 220);  // 初始化为黑色
    this.displayBuffer = [];

    // 初始化所有像素为黑色
    for (let i = 0; i < this.displaySize; i++) {
      this.displayBuffer[i] = this.initColor;
    }
  }

  // 设置缓冲区中某个像素的颜色
  setPixel(_index, _color) {
    this.displayBuffer[_index] = _color;
  }

  // 设置缓冲区中所有像素的颜色
  setAllPixels(_color) {
    for (let i = 0; i < this.displaySize; i++) {
      this.setPixel(i, _color);
    }
  }

  // 将缓冲区内容显示到屏幕
  show() {
    for (let i = 0; i < this.displaySize; i++) {
      fill(this.displayBuffer[i]);
      rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
  }

  // 清空显示
  clear() {
    for (let i = 0; i < this.displaySize; i++) {
      this.displayBuffer[i] = this.initColor;
    }
  }
}
