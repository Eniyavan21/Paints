import RNFetchBlob from 'rn-fetch-blob';



const saveBase64ImageToFile = async (base64String, fileName, path) => {
  try {
    // Remove data:image/png;base64, from base64 string
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    let filePath = `${path}/${fileName}.png`;

    const exists = await RNFetchBlob.fs.exists(filePath);
    if(exists){
      for (let i = 0; await RNFetchBlob.fs.exists(filePath); i++) {
        filePath = `${path}/${fileName}${i}.png`;
      }
    }

       // Write the file
    await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');
    
    return filePath;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};



export default saveBase64ImageToFile;