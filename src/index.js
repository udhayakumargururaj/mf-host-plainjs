
// Convert a React element to a valid HTML element
function convertReactElementToHTMLButton(reactElement) {
    const { type, props } = reactElement;
    const htmlButton = document.createElement(type);
  
    // Set class name
    if (props.className) {
      htmlButton.className = props.className;
    }
  
    // Set click event listener
    if (props.onClick) {
      htmlButton.addEventListener('click', props.onClick);
    }
  
    // Set text content
    if (props.children) {
      htmlButton.textContent = props.children;
    }
  
    return htmlButton;
  }
  
  
async function loadRemoteComponent(scope, module) {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes.
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  }
  
  async function render() {
    const Button = await loadRemoteComponent('remoteApp', './Button');
  
    // Create a container element to mount the remote component
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'remote-button-container';
    document.body.appendChild(buttonContainer);
  
    // Render the remote component
    const buttonElement = Button.default();
    const htmlElement = convertReactElementToHTMLButton(buttonElement);
    if (htmlElement instanceof HTMLElement) {
      // Ensure that the buttonElement is a valid DOM node before appending it
      buttonContainer.appendChild(htmlElement);
    } else {
      console.error('Error rendering remote component: Invalid DOM node');
    }
  }
  
  (async () => {
    // Call the render function
    await render().catch(err => {
      console.error('Error rendering remote component:', err);
    });
  })();
  