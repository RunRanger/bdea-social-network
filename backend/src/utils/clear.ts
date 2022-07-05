const clear = (data: any) => {
  const clearData: any = {};
  data.forEach((item: any) => { 
    clearData[item._id as string] = item;
  })
  return Object.values(clearData);
}

export default clear;