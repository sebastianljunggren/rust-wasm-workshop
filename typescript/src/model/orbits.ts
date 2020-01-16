export interface AstronomicalObject {
    orbits: AstronomicalObject[]
}

function countOrbits (astronomicalObject: AstronomicalObject, depth: number): number {
  return depth + astronomicalObject.orbits.reduce((sum, ao) => sum + countOrbits(ao, depth + 1), 0)
}

export function jsCountOrbits (com: AstronomicalObject): number {
  return countOrbits(com, 0)
}
