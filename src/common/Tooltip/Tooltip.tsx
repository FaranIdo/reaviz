import React, { Component } from 'react';
import classNames from 'classnames';
import bind from 'memoize-bind';
import {
  Placement,
  ReferenceObject,
  ConnectedOverlay,
  TriggerTypes
} from 'rdk';
import * as css from './Tooltip.module.scss';

const tooltips: Tooltip[] = [];

export interface TooltipProps {
  content: any;
  reference?: ReferenceObject | HTMLElement | any;
  placement: Placement;
  enterDelay: number;
  leaveDelay: number;
  modifiers?: any;
  visible: boolean;
  className?: any;
  trigger: TriggerTypes[] | TriggerTypes;
  disabled?: boolean;
  followCursor?: boolean;
}

interface TooltipState {
  visible: boolean;
}

export class Tooltip extends Component<TooltipProps, TooltipState> {
  static defaultProps: Partial<TooltipProps> = {
    enterDelay: 0,
    leaveDelay: 200,
    placement: 'top',
    trigger: 'hover',
    visible: false,
    followCursor: false
  };

  timeout: any;

  constructor(props: TooltipProps) {
    super(props);

    this.state = {
      visible: props.visible
    };
  }

  componentDidUpdate(prevProps: TooltipProps) {
    const { visible } = this.props;

    if (visible !== prevProps.visible && visible !== this.state.visible) {
      if (visible) {
        this.activate();
      } else {
        this.deactivate();
      }
    }
  }

  componentWillUnmount() {
    this.deactivate();
  }

  onActivate() {
    if (!this.state.visible) {
      this.deactivateAll();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.activate(), this.props.enterDelay);
    }
  }

  onDeactivate() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.deactivate(), this.props.leaveDelay);
  }

  activate() {
    if (!this.props.disabled) {
      this.setState({ visible: true });
      tooltips.push(this);
    }
  }

  deactivate() {
    const idx = tooltips.indexOf(this);
    if (idx > -1) {
      this.setState({ visible: false });
      tooltips.splice(idx, 1);
    }
  }

  deactivateAll() {
    tooltips.forEach(t => t.deactivate());
  }

  renderContent = (animationState: string) => {
    const { content, className } = this.props;

    const cls = classNames(css.tooltip, className, {
      [css.active]: animationState === 'entered',
      [css.inactive]: animationState === 'exited'
    });

    const children = typeof content === 'function' ? content() : content;

    if (!children) {
      return null;
    }

    return <div className={cls}>{children}</div>;
  };

  render() {
    const { children, content, className, visible, ...rest } = this.props;

    return (
      <ConnectedOverlay
        {...rest}
        visible={this.state.visible}
        content={this.renderContent}
        closeOnBodyClick={false}
        closeOnEscape={false}
        onActivate={bind(this.onActivate, this)}
        onDeactivate={bind(this.onDeactivate, this)}
      >
        {children}
      </ConnectedOverlay>
    );
  }
}
