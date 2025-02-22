import { Type } from 'class-transformer';
import { Equals, IsString, ValidateNested } from 'class-validator';

import { AgentMessage } from '../../../agent/AgentMessage';
import { ConnectionMessageType } from './ConnectionMessageType';
import { Connection, DidDoc } from '../models';

export interface ConnectionRequestMessageOptions {
  id?: string;
  label: string;
  did: string;
  didDoc?: DidDoc;
}

/**
 * Message to communicate the DID document to the other agent when creating a connectino
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#1-connection-request
 */
export class ConnectionRequestMessage extends AgentMessage {
  /**
   * Create new ConnectionRequestMessage instance.
   * @param options
   */
  public constructor(options: ConnectionRequestMessageOptions) {
    super();

    if (options) {
      this.id = options.id || this.generateId();
      this.label = options.label;

      this.connection = new Connection({
        did: options.did,
        didDoc: options.didDoc,
      });
    }
  }

  @Equals(ConnectionRequestMessage.type)
  public readonly type = ConnectionRequestMessage.type;
  public static readonly type = ConnectionMessageType.ConnectionRequest;

  @IsString()
  public label!: string;

  @Type(() => Connection)
  @ValidateNested()
  public connection!: Connection;
}
