import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BasketSVG(props) {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.803 13.168H5.13a2.17 2.17 0 01-1.123-.312v1.505c0 .637.502 1.159 1.123 1.159h10.151c1.194 0 2.17 1.007 2.17 2.24 0 1.233-.976 2.24-2.17 2.24s-2.17-1.003-2.17-2.24c0-.411.108-.798.3-1.13H8.576c.191.328.299.719.299 1.13 0 1.233-.975 2.24-2.17 2.24-1.194 0-2.17-1.003-2.17-2.24 0-.42.116-.814.311-1.151-1.078-.144-1.914-1.098-1.914-2.249V2.202L.329 1.067A.56.56 0 01.043.34.53.53 0 01.747.044l2.934 1.274a.637.637 0 01.052.025l.006.004.006.004.032.02a.106.106 0 00.011.01.106.106 0 01.012.011.055.055 0 00.008.006l.008.006c.012.009.02.017.028.025l.012.012.024.025.012.012.008.013a.086.086 0 01.008.012l.006.01.006.01.006.011a.09.09 0 01.006.01.086.086 0 01.016.025.021.021 0 01.004.008.02.02 0 00.004.008.125.125 0 01.018.041l.002.009.012.037c0 .004 0 .007.002.01a.031.031 0 01.002.01.13.13 0 01.003.017L4 1.725l.002.019.002.018a.26.26 0 01.008.074v1.948l13.527 1.928c.005 0 .008.002.01.003l.006.001c.012 0 .02 0 .032.004l.007.002c.004.001.008.003.013.003.008 0 .02.004.028.008a.053.053 0 00.012.004.052.052 0 01.012.004l.023.012.024.013.024.012a.083.083 0 00.024.016.078.078 0 01.01.007l.01.006a.078.078 0 01.012.008.082.082 0 00.012.008l.01.008a.04.04 0 00.01.009l.02.02.004.004c.004.003.009.007.012.013l.008.01a.04.04 0 01.008.01.04.04 0 00.008.01.04.04 0 01.008.01c.007.009.011.013.015.021a.085.085 0 00.008.013l.008.012.006.01.002.003a.059.059 0 01.004.007l.012.025c.004.004.008.012.012.02.004.013.008.021.012.03l.004.012a.082.082 0 00.004.012.059.059 0 01.004.012l.004.013a.15.15 0 01.004.014c0 .005.002.01.004.015l.002.012a.053.053 0 01.002.012l.002.015.002.014c.004.008.004.016.004.025V10.899c0 1.25-.987 2.27-2.197 2.27zM6.71 18.887c.601 0 1.095-.506 1.095-1.13 0-.626-.494-1.131-1.095-1.131s-1.095.51-1.095 1.13c0 .621.494 1.13 1.095 1.13zm9.67-1.13c0 .624-.493 1.13-1.094 1.13-.601 0-1.095-.51-1.095-1.13 0-.621.493-1.131 1.095-1.131.6 0 1.094.505 1.094 1.13zM5.13 12.057h10.672c.617 0 1.123-.518 1.123-1.163V6.739L4.007 4.902v5.997c0 .637.502 1.16 1.123 1.16z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BasketSVG;
