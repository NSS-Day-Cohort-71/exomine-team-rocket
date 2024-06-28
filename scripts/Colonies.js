export const Colonies = async () => {
  const response = await fetch('http://localhost:8088/colonies');
  const colonies = await response.json();

  return '<h2>Colony Minerals</h2>';
};
