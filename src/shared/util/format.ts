export const formatHumidity = (humidity: any) => {
    if (Number.isInteger(humidity)) {
      return humidity;  
    } else {
      return humidity.toFixed(1);  
    }
  };
  
  
  