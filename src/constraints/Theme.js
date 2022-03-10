import {Dimensions} from 'react-native'
const {width,height} = Dimensions.get("window");
// Color

export const COLORS ={
  darkblue: "#1f2856",
  white: "#fff",
  black: "#000",
  lightWhite: "#f4f4f4",
  golden: "#f2aa4c",

};

// size 
export const SIZES ={
   //global sizes
    base: 8,
    font: 18,
    radius: 10,
    padding: 10,

    // font Sizes  
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 18,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    //app dimension
    width,
    height
};

// font 
export const FONTS ={
    largeTitle: { fontFamily: "Arial, Helvetica", fontSize:  SIZES.largeTitle, lineHeight: 50  },
    h1: { fontFamily: "Times New Roman", fontSize:  SIZES.h1, lineHeight: 36  },
    h2: { fontFamily: "monospace", fontSize:  SIZES.h2, lineHeight: 30  },
    h3: { fontFamily: "cursive", fontSize:  SIZES.h3, lineHeight: 22  },
    h4: { fontFamily: "emoji", fontSize:  SIZES.h4, lineHeight: 22  },
    body1: { fontFamily: "Times New Roman", fontSize:  SIZES.body1, lineHeight: 36  },
    body2: { fontFamily: "monospace", fontSize:  SIZES.body2, lineHeight: 30  },
    body3: { fontFamily: "cursive", fontSize:  SIZES.body3, lineHeight: 22  },
    body4: { fontFamily: "fantasy", fontSize:  SIZES.h3, lineHeight: 22  },

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme