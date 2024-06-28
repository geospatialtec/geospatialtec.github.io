  /*
  CollapsibleLists.js
  Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
  the terms of the CC0 1.0 Universal legal code:
  http://creativecommons.org/publicdomain/zero/1.0/legalcode
  */

  const CollapsibleLists = (function(){
function apply(doNotRecurse){
  [].forEach.call(document.getElementsByTagName('ul'), node => {
  if (node.classList.contains('collapsibleList')){
  applyTo(node, true);
  if (!doNotRecurse){
  [].forEach.call(node.getElementsByTagName('ul'), subnode => {
  subnode.classList.add('collapsibleList')
});
}
}
})
}

function applyTo(node, doNotRecurse){
  [].forEach.call(node.getElementsByTagName('li'), li => {
  if (!doNotRecurse || node === li.parentNode){
  li.style.userSelect       = 'none';
  li.style.MozUserSelect    = 'none';
  li.style.msUserSelect     = 'none';
  li.style.WebkitUserSelect = 'none';
  li.addEventListener('click', handleClick.bind(null, li));
  toggle(li);
}
});
}

function handleClick(node, e){
  let li = e.target;
  while (li.nodeName !== 'LI'){
  li = li.parentNode;
}
if (li === node){
toggle(node);
}
}

function toggle(node){
  const open = node.classList.contains('collapsibleListClosed');
  const uls  = node.getElementsByTagName('ul');
  [].forEach.call(uls, ul => {
  let li = ul;
  while (li.nodeName !== 'LI'){
  li = li.parentNode;
}
if (li === node){
ul.style.display = (open ? 'block' : 'none');
}
});

node.classList.remove('collapsibleListOpen');
node.classList.remove('collapsibleListClosed');
if (uls.length > 0){
node.classList.add('collapsibleList' + (open ? 'Open' : 'Closed'));
}
}
return {apply, applyTo};
})();
