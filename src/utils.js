export const selectValue = (values, name) => {
  if (!name.includes('.')) {
    return values[name];
  } else {
    const nestedKeys = name.split('.');
    selectedValue = values[nestedKeys[0]];
    for (let i = 1; i < nestedKeys.length; i += 1) {
      selectedValue = selectedValue[nestedKeys[i]];
    }

    return selectedValue;
  }
};