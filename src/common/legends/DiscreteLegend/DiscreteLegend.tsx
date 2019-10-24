import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import bind from 'memoize-bind';
import { CloneElement } from '../../utils/children';
import {
  DiscreteLegendEntryProps,
  DiscreteLegendEntry
} from './DiscreteLegendEntry';
import css from './DiscreteLegend.module.scss';

export interface DiscreteLegendProps {
  /**
   * CSS Class name.
   */
  className?: any;

  /**
   * CSS Styles.
   */
  style?: any;

  /**
   * Orientation of the legend.
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Entry components to show in the legend.
   */
  entries: ReactElement<DiscreteLegendEntryProps, typeof DiscreteLegendEntry>[];
}

interface DiscreteLegendState {
  activeEntry?: string;
}

export class DiscreteLegend extends Component<
  DiscreteLegendProps,
  DiscreteLegendState
> {
  static defaultProps: Partial<DiscreteLegendProps> = {
    orientation: 'vertical'
  };

  state: DiscreteLegendState = {};

  onEntryMouseEnter(activeEntry: string) {
    this.setState({
      activeEntry
    });
  }

  onEntryMouseLeave() {
    this.setState({
      activeEntry: undefined
    });
  }

  render() {
    const { entries, orientation, style } = this.props;
    const { activeEntry } = this.state;
    const className = classNames(css.container, this.props.className, {
      [css.horizontal]: orientation === 'horizontal',
      [css.vertical]: orientation === 'vertical'
    });

    return (
      <div className={className} style={style}>
        {entries.map((entry, index) => (
          <CloneElement<DiscreteLegendEntryProps>
            element={entry}
            key={`dle-${index}`}
            active={activeEntry ? activeEntry === entry.props.label : undefined}
            onMouseEnter={bind(this.onEntryMouseEnter, this, entry.props.label)}
            onMouseLeave={bind(this.onEntryMouseLeave, this)}
          />
        ))}
      </div>
    );
  }
}
