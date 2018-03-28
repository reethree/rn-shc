import variable from "./../variables/platform";

export default (variables = variable) => {
  const contentTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: variables.contentBgColor,
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "#fff"
    }
  };

  return contentTheme;
};
