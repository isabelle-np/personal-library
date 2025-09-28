/**
 * Represents a library with its name, address, and short name.
 */
export interface Library {
  /** The full name of the library. */
  name: string;
  /** The physical address of the library. */
  address: string;
  /** A short identifier for the library. */
  shortName: string;
}

/**
 * A list of libraries available for assignment.
 */
export const LIBRARIES: Library[] = [
  {
    name: 'Library of Congress',
    address: '101 Independence Ave SE, Washington, DC 20540',
    shortName: 'LOC',
  },
  {
    name: 'Boston Public Library',
    address: '700 Boylston St, Boston, MA 02116',
    shortName: 'BPL',
  },
  {
    name: 'Free Library of Philadelphia Central',
    address: '1901 Vine St, Philadelphia, PA 19103',
    shortName: 'FLP',
  },
  {
    name: 'Arlington Public Library',
    address: '1015 N Quincy St, Arlington, VA 22201',
    shortName: 'APL',
  },
  {
    name: 'Boston University Mugar Library',
    address: '771 Commonwealth Ave, Boston, MA 02215',
    shortName: 'BU',
  },
  {
    name: 'Johns Hopkins Eisenhower Library',
    address: '3400 N Charles St, Baltimore, MD 21218',
    shortName: 'JHU',
  },
];