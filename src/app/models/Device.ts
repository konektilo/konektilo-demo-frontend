import {OpcUaNode} from "./OpcUaNode";

export interface Device {
  id: number;
  name: string;
  description: string;
  nodes: OpcUaNode[];
}
