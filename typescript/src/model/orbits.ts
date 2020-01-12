export interface AstronomicalObject {
    orbits: AstronomicalObject[]
}

class AstronomicalObjectImpl implements AstronomicalObject {
  constructor (public orbits: AstronomicalObjectImpl[]) {}

  countOrbits (depth: number): number {
    const childOrbits = this.orbits.reduce((sum, ao) => sum + ao.countOrbits(depth + 1), 0)
    return depth + childOrbits
  }
}

function fromObjectToClass (ao: AstronomicalObject): AstronomicalObjectImpl {
  const orbits = ao.orbits.map(fromObjectToClass)
  return new AstronomicalObjectImpl(orbits)
}

export function jsCountOrbits (com: AstronomicalObject): number {
  const depth = 0
  return fromObjectToClass(com).countOrbits(depth)
}
