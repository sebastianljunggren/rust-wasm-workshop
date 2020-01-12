use wasm_bindgen::prelude::*;

#[derive(Deserialize)]
pub struct AstronomicalObject {
  orbits: Vec<AstronomicalObject>
}


#[wasm_bindgen]
pub fn orbits(com: &JsValue) -> u32 {
    let com: Result<AstronomicalObject, _> = com.into_serde();
    match com {
        Ok(com) => com.orbits.len() as u32,
        _ => 0
    }
}