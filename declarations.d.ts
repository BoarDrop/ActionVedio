declare module '*.svg' {
    import React = require('react');
    const SVG: React.VFC<React.SVGProps<SVGSVGElement> & { top?: number; left?: number }>;
    export default SVG;
  }
  