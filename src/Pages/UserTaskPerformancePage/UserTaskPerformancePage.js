import * as React from "react";
import "../UserTaskPerformancePage/UserTaskPerformanceStyle.css";

import {
  Button,
  Row,
  Col
} from 'react-bootstrap'

import {
  useHistory
} from "react-router-dom"

import axios from 'axios'

import {

  SymbolPaletteComponent,
  SymbolInfo,
  Diagram,
  NodeModel,
  Connector,
  ConnectorModel,
  NodeConstraints,
  BpmnShapeModel,
  BpmnGatewayModel,
  ContextMenuSettingsModel,
  DiagramComponent,
  BpmnShape,
  BpmnLoops,
  BpmnTriggers,
  DiagramBeforeMenuOpenEventArgs,
  BpmnBoundary,
  BpmnDataObjects,
  BpmnTasks,
  BpmnEvents,
  BpmnGateways,
  IDragEnterEventArgs,
  Inject,
  BpmnDiagrams,
  UndoRedo,
  DiagramContextMenu,
  DataBinding,
} from "@syncfusion/ej2-react-diagrams";

Diagram.Inject(DiagramContextMenu);

let diagramInstance = new DiagramComponent;
let diagram = new Diagram;
let nodes = [
  {
    id: 'start', width: 40, height: 40, offsetX: 35, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }
  },
  {
    id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      shape: 'Activity', type: 'Bpmn',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', collapsed: false,
          processes: ['processesStart', 'service', 'compensation', 'processesTask',
            'error', 'processesEnd', 'user', 'subProcessesEnd']
        }
      }
    }
  },
  {
    id: 'hazardEnd', width: 40, height: 40, offsetX: 305, offsetY: 420, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' },
    }, annotations: [{
      id: 'label2', content: 'Hazard',
      style: { fill: 'white', color: 'black' }, verticalAlignment: 'Top', margin: { top: 20 }
    }]
  },
  {
    id: 'cancelledEnd', width: 40, height: 40, offsetX: 545, offsetY: 420, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' },
    }, annotations: [{
      id: 'cancelledEndLabel2', content: 'Cancelled',
      style: { fill: 'white', color: 'black' }, verticalAlignment: 'Top', margin: { top: 20 }
    }]
  },
  {
    id: 'end', width: 40, height: 40, offsetX: 665, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    },
  },
  {
    id: 'processesStart', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }, margin: { left: 40, top: 80 }
  },
  {
    id: 'service', style: { fill: '#6FAAB0' }, width: 95, height: 70,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'Service',
          loop: 'parallelmultiinstance',
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Book hotel', offset: { x: 0.50, y: 0.50 },
      style: { color: 'white', }
    }], margin: { left: 110, top: 20 },
  },
  {
    id: 'compensation', width: 30, height: 30,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Intermediate', trigger: 'Compensation' }
    }, margin: { left: 170, top: 100 }
  },
  {
    id: 'processesTask', style: { fill: '#F6B53F' }, width: 95, height: 70,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'Service',
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Charge credit card', offset: { x: 0.50, y: 0.60 },
      style: { color: 'white' }
    }], margin: { left: 290, top: 20 },
  },
  {
    id: 'error', width: 30, height: 30,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'Intermediate', trigger: 'Error'
      }
    }, margin: { left: 350, top: 100 }
  },
  {
    id: 'processesEnd', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    }, margin: { left: 440, top: 80 }
  },
  {
    id: 'user', style: { fill: '#E94649' }, width: 90, height: 80,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: {
          type: 'User', Compensation: true, offset: { x: 0.50, y: 1 }
        },
      },
    }, annotations: [{
      id: 'serviceLabel2', content: 'Cancel hotel reservation', offset: { x: 0.50, y: 0.60 },
      style: { color: 'white' }
    }], margin: { left: 240, top: 160 },
  },
  {
    id: 'subProcessesEnd', width: 30, height: 30, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    }, margin: { left: 440, top: 210 }
  },
];
let connectors = [
  { id: 'connector1', sourceID: 'start', targetID: 'subProcess' },
  { id: 'connector2', sourceID: 'subProcess', sourcePortID: 'success', targetID: 'end' },
  {
    id: 'connector3', sourceID: 'subProcess', sourcePortID: 'failure', targetID: 'hazardEnd', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
    annotations: [{
      id: 'connector3Label2', content: 'Booking system failure', offset: 0.50,
      style: { fill: 'white' }
    }]
  },
  {
    id: 'connector4', sourceID: 'subProcess', sourcePortID: 'cancel', targetID: 'cancelledEnd', type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
  },
  { id: 'connector5', sourceID: 'processesStart', targetID: 'service', type: 'Orthogonal', },
  { id: 'connector6', sourceID: 'service', targetID: 'processesTask' },
  { id: 'connector7', sourceID: 'processesTask', targetID: 'processesEnd', type: 'Orthogonal', },
  {
    id: 'connector8', sourceID: 'compensation', targetID: 'user', type: 'Orthogonal',
    shape: {
      type: 'Bpmn',
      flow: 'association',
      association: 'Directional'
    }, style: {
      strokeDashArray: '2,2'
    },
    segments: [{ type: 'Orthogonal', length: 30, direction: 'Bottom' },
    { type: 'Orthogonal', length: 80, direction: 'Right' }]
  },
  {
    id: 'connector9', sourceID: 'error', targetID: 'subProcessesEnd', type: 'Orthogonal',
    annotations: [{
      id: 'connector9Label2', content: 'Cannot charge card', offset: 0.50,
      style: { fill: 'white', color: 'black' }
    }],
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
  }
];
let bpmnShapes = [
  {
    id: 'Start', width: 35, height: 35, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'Start' }
    }
  },
  {
    id: 'NonInterruptingIntermediate', width: 35, height: 35, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'NonInterruptingIntermediate' }
    },
  },
  {
    id: 'End', width: 35, height: 35, offsetX: 665, offsetY: 230, shape: {
      type: 'Bpmn', shape: 'Event',
      event: { event: 'End' }
    },
  },
  {
    id: 'Task', width: 35, height: 35, offsetX: 700, offsetY: 700,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task',
      },
    }
  },
  {
    id: 'Transaction', width: 35, height: 35, offsetX: 300, offsetY: 100,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      type: 'Bpmn', shape: 'Activity',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', transaction: {
            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
          }
        }
      }
    }
  }, {
    id: 'Task_Service', width: 35, height: 35, offsetX: 700, offsetY: 700,
    shape: {
      type: 'Bpmn', shape: 'Activity', activity: {
        activity: 'Task', task: { type: 'Service' }
      },
    }
  },
  {
    id: 'Gateway', width: 35, height: 35, offsetX: 100, offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
  },
  {
    id: 'DataObject', width: 35, height: 35, offsetX: 500, offsetY: 100,
    shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } }
  }, {
    id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      shape: 'Activity', type: 'Bpmn',
      activity: {
        activity: 'SubProcess', subProcess: {
          type: 'Transaction', collapsed: false,
          processes: [], transaction: {
            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
          }
        }
      }
    }
  },
];
let contextMenu = {
  show: true, 
  items: [
    {
      text: 'Ad-Hoc', id: 'Adhoc',
      items: [{ text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
      { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
    }, {
      text: 'Loop', id: 'Loop',
      items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
      { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
      { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
      { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
    }, {
      text: 'Compensation', id: 'taskCompensation',
      items: [{ text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
      { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
    }, {
      text: 'Activity-Type', id: 'Activity-Type',
      items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
      { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
    }, {
      text: 'Boundry', id: 'Boundry',
      items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
      { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
      { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }]
    }, {
      text: 'Data Object', id: 'DataObject',
      items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
      { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
      { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
    }, {
      text: 'Collection', id: 'collection',
      items: [{ text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
      { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
    }, {
      text: 'Call', id: 'DeftCall',
      items: [{ text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
      { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }]
    }, {
      text: 'Trigger Result', id: 'TriggerResult',
      items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
      { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
      { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
      { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
      { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
      { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
      { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
      { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
      { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
      { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
      { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
      { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
      { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
      ]
    },
    {
      text: 'Event Type', id: 'EventType',
      items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
      { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
      { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
      { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
      {
        text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate',
        iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
      },
      { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
    }, {
      text: 'Task Type', id: 'TaskType',
      items: [
        { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
        { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
        { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
        { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
        { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
        { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
        { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
        { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
        { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
      ]
    }, {
      text: 'GateWay', id: 'GateWay',
      iconCss: 'e-bpmn-icons e-Gateway', items: [
        { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
        { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
        { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
        { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
        { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
        { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
        { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
        { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
      ]
    },
  ],
  showCustomMenuOnly: false,
  
};

function getConnectors() {

  let connectorSymbols = [
    {
      id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
      id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeDashArray: '4 4', strokeColor: '#757575' }
    },
    {
      id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
      id: 'link4', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
      targetDecorator: { style: { strokeColor: '#757575', fill: '#757575' } },
      shape: {
        type: 'Bpmn',
        flow: 'Association',
        association: 'Directional'
      }, style: {
        strokeDashArray: '2,2', strokeColor: '#757575'
      },
    },
  ];
  return connectorSymbols;
}

let isMobile;

function addEvents(){
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    let paletteIcon = document.getElementById('palette-icon');
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false);
    }
  }
}
function openPalette() {
  let paletteSpace = document.getElementById('palette-space');
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
      paletteSpace.classList.add('sb-mobile-palette-open');
    } else {
      paletteSpace.classList.remove('sb-mobile-palette-open');
    }
  }
}
function contextMenuClick(args) {
  diagram = diagramInstance;
  if (diagram.selectedItems.nodes.length > 0) {
    let bpmnShape = diagram.selectedItems.nodes[0].shape;
    if (args.item.iconCss.indexOf('e-adhocs') > -1) {
      bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
    }
    if (args.item.iconCss.indexOf('e-event') > -1) {
      bpmnShape.event.event = (args.item.id);
    }
    if (args.item.iconCss.indexOf('e-trigger') > -1) {
      bpmnShape.event.trigger = (args.item.text);
    }
    if (args.item.iconCss.indexOf('e-loop') > -1) {
      let loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
      if (bpmnShape.activity.activity === 'Task') {
        bpmnShape.activity.task.loop = loop;
      }
      if (bpmnShape.activity.activity === 'SubProcess') {
        bpmnShape.activity.subProcess.loop = loop;
      }
    }
    if (args.item.iconCss.indexOf('e-compensation') > -1) {
      let compensation = (args.item.id === 'CompensationNone') ? false : true;
      if (bpmnShape.activity.activity === 'Task') {
        bpmnShape.activity.task.compensation = compensation;
      }
      if (bpmnShape.activity.activity === 'SubProcess') {
        bpmnShape.activity.subProcess.compensation = compensation;
      }
    }
    if (args.item.iconCss.indexOf('e-call') > -1) {
      let compensation = (args.item.id === 'CallNone') ? false : true;
      if (bpmnShape.activity.activity === 'Task') {
        bpmnShape.activity.task.call = compensation;
      }
    }
    if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
      if (args.item.id === 'ExpandedSubProcess') {
        bpmnShape.activity.activity = 'SubProcess';
        bpmnShape.activity.subProcess.collapsed = false;
      } else {
        bpmnShape.activity.activity = 'SubProcess';
        bpmnShape.activity.subProcess.collapsed = true;
      }
    }
    if (args.item.iconCss.indexOf('e-boundry') > -1) {
      let call = args.item.id;
      if (args.item.id !== 'Default') {
        call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
      }
      bpmnShape.activity.subProcess.boundary = call;
    }
    if (args.item.iconCss.indexOf('e-data') > -1) {
      let call = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
      bpmnShape.dataObject.type = call;
    }
    if (args.item.iconCss.indexOf('e-collection') > -1) {
      let call = (args.item.id === 'Collectioncollection') ? true : false;
      bpmnShape.dataObject.collection = call;
    }
    if (args.item.iconCss.indexOf('e-task') > -1) {
      let task = args.item.id === 'TaskNone' ? 'None' : args.item.id;
      if (bpmnShape.activity.activity === 'Task') {
        bpmnShape.activity.task.type = task;
      }
    }
    if (args.item.iconCss.indexOf('e-gate') > -1) {
      let task = args.item.id.replace('Gateway', '');
      if (bpmnShape.shape === 'Gateway') {
        bpmnShape.gateway.type = task;
      }
    }
    diagram.dataBind();
  }
}
// tslint:disable-next-line:max-func-body-length
function contextMenuOpen(args) {
  diagram = diagramInstance;
  let hiddenId = [];
  if (args.element.className !== 'e-menu-parent e-ul ') {
    hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
      'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay'];
  }
  if (diagram.selectedItems.nodes.length) {
    for (let item of args.items) {
      let bpmnShape = diagram.selectedItems.nodes[0].shape;
      if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
        if (item.text === 'Ad-Hoc') {
          if (bpmnShape.activity.activity === 'SubProcess') {
            hiddenId.splice(hiddenId.indexOf(item.id), 1);
          }
        }
        if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
          if (bpmnShape.shape === 'Activity') {
            hiddenId.splice(hiddenId.indexOf(item.id), 1);
          }
        }
        if (item.text === 'Boundry') {
          if (bpmnShape.activity.activity === 'SubProcess') {
            hiddenId.splice(hiddenId.indexOf(item.id), 1);
          }
        }
      }
      if (item.text === 'Data Object') {
        if (bpmnShape.shape === 'DataObject') {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'Collection') {
        if (bpmnShape.shape === 'DataObject') {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'Call') {
        if (bpmnShape.shape === 'Activity' && bpmnShape.activity.activity === 'Task') {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'Trigger Result') {
        if ((bpmnShape.shape === 'Event')) {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'Event Type') {
        if ((bpmnShape.shape === 'Event')) {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'Task Type') {
        if ((bpmnShape.shape === 'Activity')
          && (bpmnShape.activity.activity === 'Task')) {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (item.text === 'GateWay') {
        if ((bpmnShape.shape === 'Gateway')) {
          hiddenId.splice(hiddenId.indexOf(item.id), 1);
        }
      }
      if (args.parentItem && args.parentItem.id === 'TriggerResult' && bpmnShape.shape === 'Event') {

        if (item.text !== 'None' && (item.text === bpmnShape.event.event || item.text === bpmnShape.event.trigger)) {
          hiddenId.push(item.id);
        }
        if (bpmnShape.event.event === 'Start') {
          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
            hiddenId.push(item.id);
          }
        }
        if (bpmnShape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
            item.text === 'Error' || item.text === 'None') {
            hiddenId.push(item.id);
          }
        }
        if (bpmnShape.event.event === 'Intermediate') {
          if (item.text === 'Terminate') {
            hiddenId.push(item.id);
          }
        }
        if (bpmnShape.event.event === 'NonInterruptingIntermediate') {
          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
            item.text === 'Error' || item.text === 'None' || item.text === 'Link') {
            hiddenId.push(item.id);
          }
        }
        if (bpmnShape.event.event === 'ThrowingIntermediate') {
          if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
            item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
            hiddenId.push(item.id);
          }
        }
        if (bpmnShape.event.event === 'End') {
          if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
            hiddenId.push(item.id);
          }
        }
      }
      if (args.parentItem && args.parentItem.id === 'EventType' && bpmnShape.shape === 'Event') {
        if (item.text === bpmnShape.event.event) {
          hiddenId.push(item.id);
        }
      }
    }
  }
  args.hiddenItems = hiddenId;
}

function UserTaskPerformancePage(){
  
  state = {
    startTime: Date().toLocaleString(),
    finishTime: "",
    exerciseId: "",
    studentId: "",
    chart: ""
  };

  function handleSaveButClick(i){
    //converting chart to Json
    let diagramElement = document.getElementById('diagram');
    let diagram = diagramElement.ej2_instances[0];
    this.setState({chart: diagram.saveDiagram()});
    
    //call to the back for save
    axios.post("https://localhost:44383/api/Attempt/Create", this.state)
    .then(response  => {
      console.log(response);
    })
    .cath(error => {
      console.log(error);
    })
  }

  function handleSendButClick(i){
    //converting chart to Json
    let diagramElement = document.getElementById('diagram');
    let diagram = diagramElement.ej2_instances[0];
    this.setState({chart: diagram.saveDiagram()});

    //time of finnish
    this.finishTime({chart: Date().toLocaleString()});
    
    //call to the back for save and check
    axios.post("https://localhost:44383/api/Attempt/Create", this.state)
    .then(response  => {
      console.log(response);
    })
    .cath(error => {
      console.log(error);
    })
  }

  return (
      <>

      <div className="control-pane" style={{backgroundColor: 'grey'}}>
        
        <Row className="m-3" >
          <Col lg={10}>
            <Button variant="primary" className="m-1" onClick={handleSaveButClick}>Save</Button>
            <Button variant="primary" className="m-1"  onClick={handleSendButClick}>Send for check</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={useHistory().goBack}>Back</Button>
          </Col>
        </Row>

        <div className="control-section">
          <div
            id="palette-space"
            className="sb-mobile-palette"
          >
            <SymbolPaletteComponent
              id="symbolpalette"
              expandMode="Multiple"
              palettes={[
                {
                  id: "Bpmn",
                  expanded: true,
                  symbols: bpmnShapes,
                  iconCss: "e-diagram-icons1 e-diagram-Bpmn",
                  title: "Bpmn Shapes"
                },
                {
                  id: "connectors",
                  expanded: true,
                  symbols: getConnectors(),
                  iconCss: "e-diagram-icons1 e-diagram-connector",
                  title: "Connectors"
                }
              ]}
              width={"100%"}
              height={"550px"}
              symbolHeight={60}
              symbolWidth={60}
              symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
              getNodeDefaults={(symbol) => {
                symbol.style.strokeColor = '#757575';
              }}
              getSymbolInfo={(symbol) => {
                return { fit: true };
              }}
            ><Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]} />
            </SymbolPaletteComponent>
          </div>

          <div
            id="diagram-space"
            className="sb-mobile-diagram sb-bpmn-editor"
          >
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"550px"}
              snapSettings={{ constraints: 0 }}
              nodes={[]}
              connectors={[]}
              //Sets the default values of a node
              contextMenuSettings={contextMenu}
              contextMenuOpen={contextMenuOpen}
              contextMenuClick={contextMenuClick}
              dragEnter={(args) => {
                let obj = args.element;
                if (obj instanceof Node) {
                  if (!obj.shape.activity.subProcess.collapsed) {
                    obj.shape.activity.subProcess.transaction.cancel.visible = true;
                    obj.shape.activity.subProcess.transaction.failure.visible = true;
                    obj.shape.activity.subProcess.transaction.success.visible = true;
                  } else {
                    let oWidth = obj.width;
                    let oHeight = obj.height;
                    let ratio = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                    obj.offsetX += (obj.width - oWidth) / 2;
                    obj.offsetY += (obj.height - oHeight) / 2;
                  }
                }
              }
              }
            ><Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]} />
            </DiagramComponent>
          </div>
        </div>
      </div>

      </>
    );
}

export default UserTaskPerformancePage