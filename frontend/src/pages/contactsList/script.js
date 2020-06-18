function startInterval() {
  const interval = setInterval(function () {
    const contactsList = document.querySelectorAll("#contactsList li");

    contactsList.forEach(contact => {
      contact.addEventListener('click', function(){  
        const contactProperties = contact.querySelectorAll('span');
        const propertyList =  document.querySelectorAll("#contactProperties li span");
        const [update, exclude] =  document.querySelectorAll("#contactProperties button");

        contactsList.forEach(item => {
          item.className = ''
        });
        contact.className= "active";

        propertyList.forEach((item, index) => {
          propertyList[index].innerHTML = contactProperties[index].innerHTML;
        });
        
        update.setAttribute(
          'key',
          contactProperties[contactProperties.length-1].innerText
        );

        exclude.setAttribute(
          'key',
          contactProperties[contactProperties.length-1].innerText
        );
      });
    })
  }, 500);

  setTimeout(() => clearInterval(interval), 5000);
}
window.onclick = startInterval; 

startInterval();
