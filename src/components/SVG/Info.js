import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function InfoSVG(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Circle cx={8} cy={8} r={7.5} stroke="#A0A0A0" />
      <Path
        d="M7.414 12V6h1.168v6H7.414zm.59-6.926a.743.743 0 01-.524-.203.66.66 0 01-.214-.492c0-.193.071-.357.214-.492a.735.735 0 01.524-.207c.203 0 .376.069.52.207.145.135.218.3.218.492 0 .19-.073.354-.219.492a.729.729 0 01-.52.203z"
        fill="#A0A0A0"
      />
    </Svg>
  );
}

export default InfoSVG;
