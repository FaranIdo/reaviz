import posed from 'react-pose';
import { transition, d3Interpolate } from '../../common/utils/animations';

export const PosedCircle = posed.circle({
  enter: {
    cx: ({ enterProps }) => enterProps.cx,
    cy: ({ enterProps }) => enterProps.cy,
    r: ({ size }) => size,
    delay: ({ animated, index }) => (animated ? index * 10 : 0),
    transition: {
      ...transition,
      // Circles need same easing as area/line
      cx: d3Interpolate,
      cy: d3Interpolate
    }
    // https://github.com/Popmotion/popmotion/issues/646
    // transition: ({ animated }) => (animated ? transition : { duration: 0 })
  },
  exit: {
    cx: ({ exitProps }) => exitProps.cx,
    cy: ({ exitProps }) => exitProps.cy,
    r: 0
  }
});
