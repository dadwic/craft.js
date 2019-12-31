(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{148:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return d}));var o=t(1),r=t(9),a=(t(0),t(151)),i=(t(152),{id:"user-components",title:"User components"}),c={id:"concepts/user-components",title:"User components",description:'import {API} from "../api/API";',source:"@site/docs/concepts/user-components.md",permalink:"/craft.js/r/docs/concepts/user-components",sidebar:"docs",previous:{title:"Nodes",permalink:"/craft.js/r/docs/concepts/nodes"},next:{title:"Interacting with the Editor",permalink:"/craft.js/r/docs/concepts/editor-components"}},s=[{value:"Connectors",id:"connectors",children:[]},{value:"Props manipulation",id:"props-manipulation",children:[]},{value:"Collecting Node's state",id:"collecting-nodes-state",children:[]},{value:"Default Props",id:"default-props",children:[]},{value:"Specify drag/drop rules",id:"specify-dragdrop-rules",children:[]},{value:"Related components",id:"related-components",children:[]},{value:"Defining droppable regions",id:"defining-droppable-regions",children:[]}],l={rightToc:s},p="wrapper";function d(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(a.b)(p,Object(o.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"User Components are intended to be written just like any other React Component. "),Object(a.b)("p",null,"Let's start with a simple Hero component:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Hero = ({title}) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n    </div>\n  )\n}\n")),Object(a.b)("p",null,"Now, let's actually get the component to work with the editor. The ",Object(a.b)("inlineCode",{parentName:"p"},"useNode")," hook provides us with several information and methods related to the corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," that manages the component."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const { connectors: {connect, drag}, setProp, ...collected } = useNode((node) => {});\n")),Object(a.b)("p",null,"Additionally we can pass configuration values via the static ",Object(a.b)("inlineCode",{parentName:"p"},"craft")," property:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Hero = () => {...}\nHero.craft = {\n  defaultProps: {},\n  rules: {\n    canDrag: () => true,\n    canMoveIn: () => true,\n    canMoveOut: () => true\n  },\n  related: {}\n}\n")),Object(a.b)("p",null,"We'll explore each of these values in the following sections."),Object(a.b)("h2",{id:"connectors"},"Connectors"),Object(a.b)("p",null,"The first thing we would want to do is to actually let Craft.js to manage the DOM for our component. "),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"connect"),": specifies the DOM that represents the User Component.  If the component's corresponding Node is a Canvas, then this also defines the area that is droppable."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"drag"),": specifies the DOM element that should be made draggable. When the user drags this element, it'll be considered as dragging the entire component, therefore moving the entire component to the drop location. This connector only takes effect if the component's corresponding node is a Canvas Node.")),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"{17,18,21}","{17,18,21}":!0}),"const Hero = ({title, children}) => {\n  const { connectors: {connect, drag} } = useNode();\n  return (\n    <div ref={connect(drag)}>\n      <h2>{title}</h2>\n      <div>\n        {children}\n      </div>\n    </div>\n  )\n}\n\nconst App = () => {\n  return (\n    <Editor resolvers={{Hero}}>\n      <Frame>\n        <Canvas is={Hero}> // (i)\n          <Hero> // (ii)\n            <h2>Hi</h2>\n          </Hero>\n          <Canvas is={Hero}> // (iii)\n            <h2>Hi</h2>\n          </Canvas>\n        </Canvas>\n      </Frame>\n    </Editor>\n  )\n}\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"i. ",Object(a.b)("inlineCode",{parentName:"li"},"Hero")," is being rendered with a Canvas Node, thus it defines a droppable region. However, since it is not a child of a Canvas Node, it is not draggable (the ",Object(a.b)("inlineCode",{parentName:"li"},"drag")," handler will not do anything)."),Object(a.b)("li",{parentName:"ul"},"ii. ",Object(a.b)("inlineCode",{parentName:"li"},"Hero")," is an immediate child of a Canvas Node; it is draggable."),Object(a.b)("li",{parentName:"ul"},"iii. ",Object(a.b)("inlineCode",{parentName:"li"},"Hero")," is an immediate child of a Canvas Node and is rendered with a Canvas Node - it is both draggable and droppable.")),Object(a.b)("h2",{id:"props-manipulation"},"Props manipulation"),Object(a.b)("p",null,"You've probably seen page editors where you could directly interact with the components and manipulate them. For instance, drag to resize an image or visually edit a text. This is easily achievable with Craft.js as well."),Object(a.b)("p",null,"Since components are managed by their corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," which contains information including the component's props, thus we can call the ",Object(a.b)("inlineCode",{parentName:"p"},"setProp")," method to update the prop values stored in the ",Object(a.b)("inlineCode",{parentName:"p"},"Node"),". In turn, this will re-render the component with its updated values."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Hero = ({title}) => {\n  const { connectors: {connect, drag}, setProp } = useNode();\n\n  return (\n    <div ref={connect(drag)}>\n      <h2 contentEditable={true} onKeyUp={(e) => {\n        setProp(props => {\n          props.text = e.target.innerText;\n        })\n      }}>{title}</h2>\n    </div>\n  )\n}\n")),Object(a.b)("p",null,"In the above example, we have updated our ",Object(a.b)("inlineCode",{parentName:"p"},"h2")," element to be content editable and added an event handler to update the ",Object(a.b)("inlineCode",{parentName:"p"},"text")," prop as the user visually enters in a new value."),Object(a.b)("h2",{id:"collecting-nodes-state"},"Collecting Node's state"),Object(a.b)("p",null,"The information stored in a corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," could be useful in helping you build more usable components. We can retrieve information from a ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," by passing a collector function to the ",Object(a.b)("inlineCode",{parentName:"p"},"useNode")," hook. Every time the values we retrieved via the collector function changes, our component will re-render. This is very much similar to Redux's ",Object(a.b)("inlineCode",{parentName:"p"},"connect")," pattern."),Object(a.b)("p",null,"For instance, let's say we would like to enable the content editable text from the previous section only when the user has actually clicked on our component: "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Hero = ({title}) => {\n  const { connectors: {connect, drag}, setProp, isClicked } = useNode((node) => ({\n    isClicked: node.events.selecteded\n  }));\n\n  return (\n    <div ref={connect(drag)}>\n      <h2 contentEditable={isClicked} onKeyUp={(e) => {\n        setProp(props => {\n          props.text = e.target.innerText;\n        })\n      }}>{title}</h2>\n    </div>\n  )\n}\n")),Object(a.b)("h2",{id:"default-props"},"Default Props"),Object(a.b)("p",null,"While it's not necessary as we could simply define default parameters (e.g.: ES6 defaults) directly within our components, these default values will not actually be recorded into the component's corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"Node"),", which could leave us with a lot of empty prop values when we wish to retrieve the ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," for a component when building other parts of our editor (eg: a Toolbar for editing a component's values)."),Object(a.b)("p",null,"To prevent that, we can explicitly specify default prop values via the ",Object(a.b)("inlineCode",{parentName:"p"},"craft.defaultProps")," like the following:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'const Hero = ({text}) => { /** same as previous example **/ }\nHero.craft = {\n  defaultProps: {\n    text: "Hi there!"\n  }\n}\n')),Object(a.b)("h2",{id:"specify-dragdrop-rules"},"Specify drag/drop rules"),Object(a.b)("p",null,"You may want to restrict how your components are dragged or what goes in and out of your component. These rules can be specified in the static ",Object(a.b)("inlineCode",{parentName:"p"},"craft.rules"),"."),Object(a.b)("p",null,"Let us write a (pretty strange) rule for our Hero component which users can only drag if they change the ",Object(a.b)("inlineCode",{parentName:"p"},"text"),' prop to "Drag": '),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'const Hero = ({text}) => { /** same as the previous example **/ }\nHero.craft = {\n  defaultProps: { /** same as the previous example **/ },\n  rules: {\n    canDrag: (node) => !!node.data.props.text == "Drag"\n  }\n}\n')),Object(a.b)("h2",{id:"related-components"},"Related components"),Object(a.b)("p",null,"What happens if you need to design some component to complement our  user component? For instance, if we were planning on building a Toolbar somewhere in our page editor, we would like the Toolbar to display a bunch of text inputs to allow the user the edit the currently selected component. It would be great if we could retrieve a specific component that has all the relevant inputs for the user to edit the currently selected component."),Object(a.b)("p",null,"This is where related components become useful. These components share the same corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"Node")," as the actual user component, hence the ",Object(a.b)("inlineCode",{parentName:"p"},"useNode")," hook that we have been using all this while will be made available to these components as well. "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'const Hero = ({text}) => { /** same as the previous example **/ }\nHero.craft = {\n  related: {\n    toolbar: HeroToolbarSettings\n  }\n}\n\nconst HeroToolbarSettings = () => {\n  const { setProp, text } = useNode((node) => ({\n    text: node.data.props.text\n  }));\n\n  return (\n    <div>\n      <h2>Hero settings</h2>\n      <input \n        type = "text" \n        value={text} \n        onChange={e => \n          setProp(prop => prop.text = e.target.value) \n        }\n       />\n    </div>\n  )\n}\n')),Object(a.b)("p",null,"Now, let's say we have a Toolbar component somewhere in our editor. We can easily retrieve the related component as such:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Toolbar = () => {\n  const { selectededNodeId, toolbarSettings } = useEditor((state) => ({\n    selectededNodeId : state.eventselectedcted,\n    toolbarSettings:  state.nodes[state.events.selecteded].related.toolbar\n  }));\n  return (\n    <div>\n      <h2>My Awesome Toolbar</h2>\n      {\n        selectededNodeId && toolbarSettings ? \n          React.createElement(toolbarSettings)\n        : null\n      }\n    </div>\n  )\n}\n\n")),Object(a.b)("h2",{id:"defining-droppable-regions"},"Defining droppable regions"),Object(a.b)("p",null,"Let's say we are creating a Hero component that has two sections where the users could drop other user elements into. "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const Hero = ({title}) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n      <section>\n        <h3>Yo</h3>\n      </section>\n      I need some coffee to continue writing this\n      <section>\n        <h2>Hi</h2>\n      </section>\n    </div>\n  )\n}\n")),Object(a.b)("p",null,"Previously, we discussed how ",Object(a.b)("inlineCode",{parentName:"p"},"<Canvas />")," creates a droppable Canvas node; that concept is applied universally in Craft.js. Hence, we just have to wrap our ",Object(a.b)("inlineCode",{parentName:"p"},"section")," elements in the example above with a ",Object(a.b)("inlineCode",{parentName:"p"},"Canvas"),". "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"{5,9}","{5,9}":!0}),'const Hero = ({title}) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n      <Canvas id="Header" is="section">\n        <h3>Yo</h3>\n      </section>\n      I need some coffee to continue writing this\n      <Canvas id="Footer" is="section">\n        <h2>Hi</h2>\n      </section>\n    </div>\n  )\n}\n')),Object(a.b)("p",null,"But wait, what if we want to define rules for these two new droppable regions? "),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"is")," prop of the ",Object(a.b)("inlineCode",{parentName:"p"},"<Canvas />")," component is used to specify the ",Object(a.b)("inlineCode",{parentName:"p"},"type")," of the User Element for the Canvas Node. Hence, instead of specifying a simple DOM element which we don't have much control over, let's specify a brand new User Component."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"{1-23,29,33}","{1-23,29,33}":!0}),'const HeroHeader = ({children}) => {\n  return (\n    <section>\n      {children}\n    </section>\n  )\n}\n\nHeroHeader.craft = {\n  rules : {...}\n}\n\nconst HeroFooter = ({children}) => {\n  return (\n    <section>\n      {children}\n    </section>\n  )\n}\n\nHeroFooter.craft = {\n  rules : {...}\n}\n\nconst Hero = ({title}) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n      <Canvas id="Hero" is={HeroHeader}>\n        <h3>Yo</h3>\n      </section>\n      I need some coffee to continue writing this\n      <Canvas id="Footer" is={HeroFooter}>\n        <h2>Hi</h2>\n      </section>\n    </div>\n  )\n}\n')),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"HeroHeader")," and ",Object(a.b)("inlineCode",{parentName:"p"},"HeroFooter")," are User Components, so we can now design and configure them just like any other User Components. On that note, don't forget that you will need to include these in the ",Object(a.b)("inlineCode",{parentName:"p"},"resolver")," as well."))}d.isMDXComponent=!0},151:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var o=t(0),r=t.n(o);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),p=function(e){var n=r.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c({},n,{},e)),t},d=function(e){var n=p(e.components);return r.a.createElement(l.Provider,{value:n},e.children)},u="mdxType",b={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},h=Object(o.forwardRef)((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(t),u=o,h=d["".concat(i,".").concat(u)]||d[u]||b[u]||a;return t?r.a.createElement(h,c({ref:n},l,{components:t})):r.a.createElement(h,c({ref:n},l))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=h;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=t[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},152:function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return c}));var o=t(0),r=t.n(o),a=function(e){var n=e.item,t=n[0],o=n.length>1&&"string"==typeof n[1]&&n[1],a=3==n.length?"string"==typeof n[2]&&n[2]:4==n.length&&"string"==typeof n[3]&&n[3],c=n.length>1&&Array.isArray(n[n.length-1])&&n[n.length-1];return r.a.createElement("li",{className:"api-item"},r.a.createElement("div",null,t&&r.a.createElement("code",{className:"api-title"},t),o&&r.a.createElement("strong",{className:"api-type"},o)),a&&r.a.createElement("div",{className:"api-description",dangerouslySetInnerHTML:{__html:a}}),c&&r.a.createElement(i,{items:c}))},i=function(e){var n=e.items;return r.a.createElement("ul",null,n&&n.map((function(e,n){return r.a.createElement(a,{item:e,key:n})})))},c=function(e){var n,t=e.type,o=e.title,a=void 0===o||o,i=e.noMargin,c=void 0===i||i;switch(t){case"hoc":n="Higher-Order Component";break;default:n=t[0].toUpperCase()+t.substring(1)}return r.a.createElement("div",{className:"badge-wrapper"},r.a.createElement("span",{className:"badge badge-"+t+" "+(a?"badge-title":"")+" "+(c?"badge-no-margin":"")},n))}}}]);