import { Sphere } from "./models/Sphere.js";
import { Planet } from "./models/Planet";

async function fetchCSV(data) {
  const response = await fetch(data);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return csv;
}

export async function loadCSV(data) {
  let csv = await fetchCSV(data);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  let content = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let planets = [];
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      console.log(headers[j]);
      if (headers[j].includes("Planet")) {
        if (currentLine[j]) {
          let planet = {};
          planet.name = currentLine[j];
          planet.orbitRadius = currentLine[j + 1];
          planet.orbitTrack = currentLine[j + 2];
          planets.push(new Planet(planet));
        }
      } else if (!headers[j].includes("Orbit")) {
        obj[headers[j]] = currentLine[j];
      }
    }
    console.log(obj);
    obj.planets = planets;
    content.push(new Sphere(obj));
  }
  console.log(content);
}
