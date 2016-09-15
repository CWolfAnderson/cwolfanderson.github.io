$(function() {
  
  let screenHeight = window.innerHeight - 30;
  let screenWidth =  window.innerWidth - 50;
  
  let words = 'Game of Thrones roughly follows the storylines set out in A Song of Ice and Fire set in the fictional Seven Kingdoms of Westeros The series chronicles the violent dynastic struggles among the realms noble families for the Iron Throne while other families are fighting for independence from it As the series opens additional threats emerge in the icy North and in the eastern continent of Essos'.split(' ');
  
  words.forEach(word => {

    let randX = Math.floor(Math.random() * (screenWidth + 1));
    let randY = Math.floor(Math.random() * (screenHeight + 1));
    
    $('.container').append(`
      <span class="draggable" style="top:${randY}px;left:${randX}px;">
        ${word}
      </span>
    `);
  });  

  $('.draggable').draggable();
  
});