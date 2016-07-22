/**
 * Created by hasee on 2016/7/22.
 */
import React from 'react';

class ControllerUnitComponent extends React.Component {
  // 构造方法初始化
  constructor(props) {
    super(props);
    // 注册
    this.handleClick = this.handleClick.bind(this);
  }

  // 点击事件
  handleClick(e) {

    // 如果点击的是当前正在选中的按钮，则翻转图片，否则将对应的图片居中
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.preventDefault();
    e.stopPropagation();
  }

  // 渲染
  render() {
    var controllerUnitClassName = 'controller-unit';

    // 如果对应的是居中的图片，显示控制按钮的状态
    if(this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center';

      // 如果同时对应的是翻转图片，显示控制按钮的翻转状态
      if(this.props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }

    return (
      <span className={ controllerUnitClassName } onClick={ this.handleClick }></span>
    );
  }

}

ControllerUnitComponent.defaultProps = {
};

export default ControllerUnitComponent;
