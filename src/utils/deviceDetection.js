export const detectDevice = () => {
  const userAgent = navigator.userAgent;
  
  // Device type detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
  
  let deviceType = 'desktop';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';
  
  // Browser detection
  let browserName = 'Unknown';
  if (userAgent.includes('Chrome')) browserName = 'Chrome';
  else if (userAgent.includes('Safari')) browserName = 'Safari';
  else if (userAgent.includes('Firefox')) browserName = 'Firefox';
  else if (userAgent.includes('Edge')) browserName = 'Edge';
  else if (userAgent.includes('Opera')) browserName = 'Opera';
  
  // OS detection
  let osName = 'Unknown';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
    osName = 'iOS';
  } else if (userAgent.includes('Mac') && !userAgent.includes('iPhone') && !userAgent.includes('iPad')) {
    osName = 'macOS';
  } else if (userAgent.includes('Windows')) {
    osName = 'Windows';
  } else if (userAgent.includes('Linux')) {
    osName = 'Linux';
  } else if (userAgent.includes('Android')) {
    osName = 'Android';
  }
  
  // Device model detection
  let deviceModel = 'Unknown';
  
  // Apple devices
  if (userAgent.includes('iPhone')) {
    if (userAgent.includes('iPhone16,')) deviceModel = 'iPhone 16';
    else if (userAgent.includes('iPhone15,')) deviceModel = 'iPhone 15';
    else if (userAgent.includes('iPhone14,')) deviceModel = 'iPhone 14';
    else if (userAgent.includes('iPhone13,')) deviceModel = 'iPhone 13';
    else if (userAgent.includes('iPhone12,')) deviceModel = 'iPhone 12';
    else if (userAgent.includes('iPhone11,')) deviceModel = 'iPhone 11';
    else deviceModel = 'iPhone';
  } else if (userAgent.includes('iPad')) {
    if (userAgent.includes('iPad14,')) deviceModel = 'iPad Pro (M4)';
    else if (userAgent.includes('iPad13,')) deviceModel = 'iPad Pro/Air (M2)';
    else deviceModel = 'iPad';
  } else if (userAgent.includes('Mac')) {
    if (userAgent.includes('Macintosh') && userAgent.includes('Apple Silicon')) {
      if (userAgent.includes('M3')) deviceModel = 'Mac (M3)';
      else if (userAgent.includes('M2')) deviceModel = 'Mac (M2)';
      else if (userAgent.includes('M1')) deviceModel = 'Mac (M1)';
      else deviceModel = 'Mac (Apple Silicon)';
    } else {
      deviceModel = 'Mac (Intel)';
    }
  } else if (userAgent.includes('Android')) {
    // Try to extract Android device model
    const androidMatch = userAgent.match(/Android.*?;\s*([^)]+)\)/);
    if (androidMatch && androidMatch[1]) {
      deviceModel = androidMatch[1].trim();
    } else {
      deviceModel = 'Android Device';
    }
  } else if (userAgent.includes('Windows')) {
    deviceModel = 'Windows PC';
  }
  
  return {
    deviceType,
    deviceModel,
    browserName,
    osName,
    userAgent
  };
};

export const getIPAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return 'Unknown';
  }
};

export const getCountryFromIP = async (ip) => {
  if (ip === 'Unknown') return 'Unknown';
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    const country = await response.text();
    return country || 'Unknown';
  } catch (error) {
    console.error('Error getting country:', error);
    return 'Unknown';
  }
};
