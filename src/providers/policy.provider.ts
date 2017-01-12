import { Injectable } from '@angular/core';
import { Policy } from '../models/policy';
import { POLICIES } from '../mock-policies';

@Injectable()
export class PolicyProvider {
  getPolicies(): Promise<Policy[]> {
    return Promise.resolve(POLICIES);
  }
}