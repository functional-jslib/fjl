import {Nameable} from "../src/types";

export type ConstructorTestCase = [Nameable, any, boolean];
type NameTestCase = [string, any, boolean];
type ConstructorOrNameTestCase = [string | Nameable | Number, any, boolean];
