require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
// 导入自定义组件
import ImgFigure from './ImgFigureComponent';

// 获取图片相关的数据
let imageDatas = require('../sources/datas/imageDatas.json');

// 利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for(var i=0; i<imageDatasArr.length; ++i) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  /*
   * 通过构造函数获取初始的state
   */
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        /*{
           pos: {
             left: '0',
             top: '0'
           },
           rotate: 0,  // 旋转角度
           isInverse: false, // 图片正反面, 正：false
           isCenter: false  // 图片是否居中
         }*/
      ]
    };
    // 注册方法
    this.get30DegRandom = this.get30DegRandom.bind(this);
    this.getRangeRandom = this.getRangeRandom.bind(this);
    this.inverse = this.inverse.bind(this);
    this.center = this.center.bind(this);
    this.rearrange = this.rearrange.bind(this);
  }

  /*
   * 获取 0~30° 之间的一个任意正负值
   */
  get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-' ) + Math.ceil(Math.random() * 30);
  }

  /*
   * 给定上下限的值，取出他们之间的随机值
   */
  getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  /*
   * 翻转图片
   * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {function} 这是一个闭包函数，其内return一个真正待被执行的函数
   */
  inverse(index) {
    return function() {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }

  /*
   * 利用 rearrange 函数，居中对应 index 的图片
   * @param index 需要被居中的图片对应的图片信息数组的 index 值
   * @return {function}
   */
  center(index) {
    return function() {
      this.rearrange(index);
    }.bind(this);
  }

  /*
   * 重新布局所有图片
   */
  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = AppComponent.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),  // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

      // 首先居中 centerIndex 的图片
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
      }

      // 取出要布局上侧图片的状态信息
      topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      // 布局位于上侧的图片
      imgsArrangeTopArr.forEach(function(value, index) {
        imgsArrangeTopArr[index] = {
          pos: {
            top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: this.get30DegRandom(),
          isCenter: false
        };
      }.bind(this));

      // 布局左右两侧的图片
      for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; ++i) {
        var hPosRangeLORX = null;

        // 前半部分布局左边，右半部分布局右边
        if(i < k) {
          hPosRangeLORX = hPosRangeLeftSecX;
        } else {
          hPosRangeLORX = hPosRangeRightSecX;
        }

        imgsArrangeArr[i] = {
          pos: {
            top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          },
          rotate: this.get30DegRandom(),
          isCenter: false
        };
      }

      if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
  }

  /*
   * 组件加载以后，为每张图片计算其位置的范围
   */
  componentDidMount() {
    var ReactDom = require('react-dom');
    var Constant = AppComponent.Constant;
    // 首先拿到舞台大小
    var stageDOM = ReactDom.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // 拿到一个 imageFigure 的大小
    var imgFigureDOM = ReactDom.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 计算出偏移量 => 防止中心图片旋转时的 transform 使用致使 z-index 失效
    var temp = Math.sqrt(Math.pow(imgW, 2) + Math.pow(imgH, 2));
    var deltaH = temp - imgH;
    var deltaW = temp - imgW;

    // 计算中心图片的位置点
    Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧、右侧区域的位置点
    Constant.hPosRange.leftSecX[0] = -halfImgW - deltaW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3 - deltaW;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW + deltaW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW + deltaW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上区域的位置点
    Constant.vPosRange.topY[0] = -halfImgH - deltaH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3 - deltaH;
    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  /*
   * 渲染
   */
  render() {
    var controllerUnits = [], // 控制按钮
        imgFigures = [];      // 图片

    imageDatas.forEach(function (value, index) {
      // 初始化 state
      if(!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        };
      }
      // 构造所有的图片框
      imgFigures.push(
        <ImgFigure
          data={ value }
          key={ 'imgFigure' + index }
          ref={ 'imgFigure' + index }
          arrange={ this.state.imgsArrangeArr[index] }
          inverse={ this.inverse(index) }
          center={ this.center(index) }
        />
      );
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          { imgFigures }
        </section>
        <nav className="controller-nav">
          { controllerUnits }
        </nav>
      </section>
    );
  }
}

AppComponent.Constant = {
  centerPos: {
    left: 0,
    right: 0
  },
  hPosRange: {  // 水平方向的取值范围
    leftSecX: [0, 0],
    rightSecX: [0, 0],
    y: [0, 0]
  },
  vPosRange: {  // 垂直方向的取值范围
    x: [0, 0],
    topY: [0, 0]
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
