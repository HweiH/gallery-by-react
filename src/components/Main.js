require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
// 导入自定义组件
import ImgFigure from './ImgFigureComponent';

// 获取图片相关的数据
let imageDatas = require('../sources/imageDatas.json');

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
  render() {

    var controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function (value) {
      imgFigures.push(<ImgFigure data={ value } />)
    });

    return (
      <section className="stage">
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

AppComponent.defaultProps = {
};

export default AppComponent;
