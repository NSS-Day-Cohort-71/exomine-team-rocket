export const GovernorOptions = async () => {
  const response = await fetch('http://localhost:8088/governors');
  const governors = await response.json();

  let html = `<select id="governors">
                  <option value="0">Select a governor</option>`;
  const stringArray = governors.map((governor) => {
    return `<option value="${governor.id}">${governor.name}</option>`;
  });
  html += stringArray.join('');
  html += '</select>';
  return html;
};
