var hornify=(()=>{var o=class{static async fetchPornTagsAsync(){var e=await fetch("https://sunsettechuila.github.io/Hornify/assets/porn-tags.json");if(!e.ok)throw new Error("Failed to fetch porn tags");o.pornTags=await e.json()}static getRandomNumber(e,t=0){return Math.floor(Math.random()*(e-t+1))+t}static rollDice(e,t=e){return t===o.getRandomNumber(e,1)}static cleanString(e){var t=new RegExp(`[${["!","@","#","$","%","^","&","*","(",")","-","_","+","=","[","]","{","}",";",":","<",">",".",",","/","?","№","•","★"," "].join("\\")}]`,"g");return e.replace(t,"").replace(/\d/g,"")}static hornifyString(e){let s=e;const a=o["pornTags"],n=a.length-1;return e.split(" ").forEach(t=>{t=o.cleanString(t);if(""!==t&&o.rollDice(8)){let e=a[o.getRandomNumber(n)];var r=t.toUpperCase();t===r&&1<t.length?e=e.toUpperCase():t[0]===r[0]&&(e=e[0].toUpperCase()+e.slice(1)),s=s.replace(t,e)}}),s}static processNode(e){var t,r=e["parentElement"];e.nodeType!==Node.TEXT_NODE||r?.classList.contains("hornify-processed")||(r?.classList.add("hornify-processed"),r=e["textContent"],t=r?.trim(),null!=r&&null!=t&&""!==t&&(e.textContent=r.replace(t,o.hornifyString(t))))}static processNodesRecursive(e){var t=e["nodeName"];if("SCRIPT"!==t&&"STYLE"!==t&&"LINK"!==t){o.processNode(e);var r=e["childNodes"];for(let e=0,t=r.length;e<t;e+=1)o.processNodesRecursive(r[e])}}static handleBodyMutation(e){e.forEach(e=>{var r=e["addedNodes"];for(let e=0,t=r.length;e<t;e+=1)o.processNodesRecursive(r[e])})}static async enableAsync(){await o.fetchPornTagsAsync(),o.bodyObserver.observe(document.body,{childList:!0,subtree:!0})}static disable(){o.bodyObserver.disconnect()}},e=o;e.bodyObserver=new MutationObserver(o.handleBodyMutation);var t=function(){e.enableAsync()};(async()=>{await t()})()})();