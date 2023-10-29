figma.showUI(__html__);

figma.ui.resize(800, 600);

// Skip over invisible nodes and their descendants inside instances
// for faster performance.
figma.skipInvisibleInstanceChildren = true;

figma.ui.onmessage = (msg) => {
  if (msg.type === "getSelectedNodeProperties") {
    const selectedNode = figma.currentPage.selection[0];

    console.log(selectedNode);

  // Convert the selectedNodeProperties object to a JSON string
  const selectedNodeJSON = JSON.stringify(selectedNode);

  // Determine which container to update (container1 or container2)
  const containerId = msg.containerId; // This should be "container1" or "container2"

  // Post the selectedNodeJSON to the HTML file
  figma.ui.postMessage({ type: "updateContainer", containerId, data: selectedNodeJSON });



  }
};
