use wasm_bindgen::prelude::*;

#[derive(Deserialize)]
pub struct AstronomicalObject {
    orbits: Vec<AstronomicalObject>,
}

pub fn parse_astronomical_object(com: &JsValue) -> AstronomicalObject {
    let com: Result<AstronomicalObject, _> = com.into_serde();
    match com {
        Ok(com) => com,
        _ => AstronomicalObject { orbits: Vec::new() },
    }
}

pub fn count_orbits(com: &AstronomicalObject) -> u32 {
    com.orbits.len() as u32
}

#[wasm_bindgen]
pub fn parse_and_count_orbits(com: &JsValue) -> u32 {
    let com = parse_astronomical_object(com);
    count_orbits(&com)
}

#[test]
fn test_count_orbits() {
    // Example from https://adventofcode.com/2019/day/6
    let com = AstronomicalObject {
        orbits: vec![
            // B
            AstronomicalObject {
                orbits: vec![
                    // G
                    AstronomicalObject {
                        orbits: vec![
                            // H
                            AstronomicalObject { orbits: Vec::new() },
                        ],
                    },
                    // C
                    AstronomicalObject {
                        orbits: vec![
                            // D
                            AstronomicalObject {
                                orbits: vec![
                                    // E
                                    AstronomicalObject {
                                        orbits: vec![
                                            // J
                                            AstronomicalObject {
                                                orbits: vec![
                                                    // K
                                                    AstronomicalObject {
                                                        orbits: vec![
                                                            // L
                                                            AstronomicalObject {
                                                                orbits: Vec::new(),
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            // F
                                            AstronomicalObject { orbits: Vec::new() },
                                        ],
                                    },
                                    // I
                                    AstronomicalObject { orbits: Vec::new() },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
    assert_eq!(count_orbits(&com), 42);
}
