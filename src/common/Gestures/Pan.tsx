import React, { Component } from 'react';
import { toggleTextSelection } from '../utils/selection';

interface PanProps {
  onPanStart: (event: PanStartEvent) => void;
  onPanMove: (event: PanMoveEvent) => void;
  onPanEnd: (event: PanEndEvent) => void;
  onPanCancel: (event: PanCancelEvent) => void;
  disabled: boolean;
  threshold: number;
  cursor?: string;
}

export interface PanStartEvent {
  source: 'mouse' | 'touch';
  nativeEvent: MouseEvent | TouchEvent;
}

export interface PanMoveEvent {
  source: 'mouse' | 'touch';
  deltaX: number;
  deltaY: number;
  nativeEvent: MouseEvent | TouchEvent;
}

export interface PanEndEvent {
  source: 'mouse' | 'touch';
  nativeEvent: MouseEvent | TouchEvent;
}

export interface PanCancelEvent {
  source: 'mouse' | 'touch';
  nativeEvent: MouseEvent | TouchEvent;
}

export class Pan extends Component<PanProps> {
  static defaultProps: PanProps = {
    onPanStart: () => undefined,
    onPanMove: () => undefined,
    onPanEnd: () => undefined,
    onPanCancel: () => undefined,
    disabled: false,
    threshold: 10
  };

  prevXPosition: number = 0;
  prevYPosition: number = 0;
  timeout: any;
  started: boolean = false;
  deltaX: number = 0;
  deltaY: number = 0;

  componentWillUnmount() {
    this.disposeHandlers();
  }

  checkThreshold() {
    return !this.started &&
      ((Math.abs(this.deltaX) > this.props.threshold) ||
        (Math.abs(this.deltaY) > this.props.threshold));
  }

  disposeHandlers() {
    clearTimeout(this.timeout);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    // Reset cursor on body back to original
    document.body.style['cursor'] = 'inherit';
    toggleTextSelection(true);
  }

  onMouseDown(event: React.MouseEvent) {
    // Ignore right click
    if (event.nativeEvent.which === 3 || this.props.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.persist();

    toggleTextSelection(false);
    this.started = false;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.deltaX = this.deltaX + event.movementX;
    this.deltaY = this.deltaY + event.movementY;

    if (this.checkThreshold()) {
      if (this.props.cursor) {
        document.body.style['cursor'] = this.props.cursor;
      }

      this.deltaX = 0;
      this.deltaY = 0;
      this.started = true;
      this.props.onPanStart({
        nativeEvent: event,
        source: 'mouse'
      });
    } else {
      this.props.onPanMove({
        source: 'mouse',
        nativeEvent: event,
        deltaX: event.movementX,
        deltaY: event.movementY
      });
    }
  };

  onMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.disposeHandlers();
    toggleTextSelection(true);

    if (this.started) {
      this.props.onPanEnd({
        nativeEvent: event,
        source: 'mouse'
      });
    } else {
      this.props.onPanCancel({
        nativeEvent: event,
        source: 'mouse'
      });
    }
  };

  onTouchStart(event: React.TouchEvent) {
    if (this.props.disabled || event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.persist();

    toggleTextSelection(false);

    this.started = false;
    this.prevXPosition = event.touches[0].clientX;
    this.prevYPosition = event.touches[0].clientY;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Calculate delta from previous position and current
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    const deltaX = clientX - this.prevXPosition;
    const deltaY = clientY - this.prevYPosition;

    this.deltaX = this.deltaX + deltaX;
    this.deltaY = this.deltaY + deltaY;

    if (this.checkThreshold()) {
      this.deltaX = 0;
      this.deltaY = 0;
      this.started = true;

      this.props.onPanStart({
        nativeEvent: event,
        source: 'touch'
      });
    } else {
      this.props.onPanMove({
        source: 'touch',
        nativeEvent: event,
        deltaX,
        deltaY
      });
    }

    this.prevXPosition = clientX;
    this.prevYPosition = clientY;
  };

  onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.disposeHandlers();
    toggleTextSelection(true);

    if (this.started) {
      this.props.onPanEnd({
        nativeEvent: event,
        source: 'touch'
      });
    } else {
      this.props.onPanCancel({
        nativeEvent: event,
        source: 'touch'
      });
    }
  };

  render() {
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        ...child.props,
        onMouseDown: e => {
          this.onMouseDown(e);
          if (child.props.onMouseDown) {
            child.props.onMouseDown(e);
          }
        },
        onTouchStart: e => {
          this.onTouchStart(e);
          if (child.props.onTouchStart) {
            child.props.onTouchStart(e);
          }
        }
      })
    );
  }
}
