#[macro_use]
extern crate serde_derive;
use wasm_bindgen::prelude::*;

pub mod fibonacci;
pub mod orbits;
pub mod selection_sort;

use orbits::{count_orbits, parse_astronomical_object, AstronomicalObject};

#[wasm_bindgen]
pub struct OrbitsBenchmark {
    com: AstronomicalObject,
}

#[wasm_bindgen]
impl OrbitsBenchmark {
    pub fn new(com: &JsValue) -> OrbitsBenchmark {
        let com = parse_astronomical_object(com);
        OrbitsBenchmark { com }
    }

    pub fn run(&self) -> u32 {
        count_orbits(&self.com)
    }
}
