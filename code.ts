

figma.showUI(__html__);
figma.ui.resize(800, 600);
figma.skipInvisibleInstanceChildren = true;

figma.ui.onmessage = (msg) => {
  if (msg.type === "getSelectedNodeProperties") {
    const selectedNode = figma.currentPage.selection[0];
    // console.log(selectedNode);
  console.log(typeof selectedNode);

   // Check if a node is selected
    if (selectedNode) {
     
      
    //converting selectedNode into object
      const nodeProperties = nodeToObject(selectedNode);
      console.log(nodeProperties);
      // Send the selectedNode as part of the pluginMessage
      figma.ui.postMessage({
        pluginMessage: {
          type: "sendSelectedNodeProperties",
          nodeProperties: nodeProperties,
        },
      });
    } else {
      // Handle the case where no node is selected
      figma.ui.postMessage({
        pluginMessage: {
          type: "sendSelectedNodeProperties",
          error: "No node is selected",
        },
      });
    }
  }
};


const nodeToObject = (node: any) => {
  const nodeProperties: { [key: string]: any } = {};

  // Basic properties
  nodeProperties.id = node.id;
  nodeProperties.name = node.name;
  nodeProperties.type = node.type;

  // Parent information
  if (node.parent) {
    nodeProperties.parent = {
      id: node.parent.id,
      type: node.parent.type,
    };
  }

  // Iterate through properties and add them to the object
  try {
    const properties = Object.getOwnPropertyNames(node);
    for (const property of properties) {
      nodeProperties[property] = node[property];
    }
  } catch (error) {
    console.error("Error while extracting properties:", error);
  }

  return nodeProperties;
};
