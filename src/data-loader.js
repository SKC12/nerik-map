import { Sphere } from "./models/Sphere.js";
import { Planet } from "./models/Planet";
import { Flow } from "./models/Flow";

async function fetchCSV(data) {
  const response = await fetch(data);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return csv;
}

async function loadCSVPlanets(data) {
  //console.log("loading planets");
  let csv = await fetchCSV(data);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  let planets = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    planets.push(obj);
  }
  return planets;
}

export async function loadCSVFlows(data) {
  //console.log("loading flows");
  let csv = await fetchCSV(data);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  let flows = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    flows.push(new Flow(obj));
  }
  return flows;
}

export async function loadCSVSpheres(sphereData, planetData) {
  //console.log("loading spheres");

  let planetsDataArray = await loadCSVPlanets(planetData);

  let csv = await fetchCSV(sphereData);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  let spheres = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let planets = [];
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      if (headers[j].includes("primaryBody")) {
        obj[headers[j]] = currentLine[j];
        let planet = {};
        planet.name = currentLine[j];
        planet.orbitRadius = "0";
        planet.orbitTrack = "I1";
        //find planetData for primary body
        if (planet.name === "Eberron")
          console.log(
            planet,
            obj,
            planetsDataArray,
            planetsDataArray.find((p) => p.name === planet.name)
          );
        let planetInfo = planetsDataArray.find(
          (p) => p.name === planet.name && p.shortName === obj.shortName
        );
        if (planetInfo) {
          planetInfo.sphereRadius = obj.sphereRadius;
          planetInfo.orbitRadius = 0;
          planetInfo.angle = Math.floor(Math.random() * 360);
          planet.info = planetInfo;
        } else if (obj["onMap?"] === "Yes" && planet.name !== "Empty") {
          planetInfo = {
            angle: Math.floor(Math.random() * 360),
            name: planet.name,
            orbitRadius: 0,
            size: "I",
            diameter: "",
            shape: "\ue008",
            details: "",
            type: "Fire",
            primaryBody: "",
            moons: "",
            rings: "",
            enviroment: "",
            creator: "",
            description: "",
            notes: "",
            "onMap?": "Yes",
            population: "",
            shortName: obj.shortName,
            source: "",
            sphere: obj.sphere,
            website: "",
            sphereRadius: obj.sphereRadius,
          };
          planet.info = planetInfo;
        }
        if (planet.name !== "Empty") planets.push(new Planet(planet));
      }
      if (headers[j].includes("Planet")) {
        if (currentLine[j] || currentLine[j + 1]) {
          let planet = {};
          planet.name = currentLine[j];
          currentLine[j + 1]
            ? (planet.orbitRadius = currentLine[j + 1])
            : (planet.orbitRadius = Math.floor(
                Math.random() * 4000
              ).toString());
          planet.orbitTrack = currentLine[j + 2];

          //find planetData for orbital bodies
          let planetInfo = planetsDataArray.find(
            (p) => p.name === planet.name && p.shortName === obj.shortName
          );
          if (planetInfo) {
            planetInfo.sphereRadius = obj.sphereRadius;
            planetInfo.orbitRadius = planet.orbitRadius;
            planetInfo.angle = Math.floor(Math.random() * 360);
            planet.info = planetInfo;
          } else if (obj["onMap?"] === "Yes" && planet.name !== "Empty") {
            planetInfo = {
              name: planet.name,
              orbitRadius: planet.orbitRadius,
              angle: Math.floor(Math.random() * 360),
              size: "C",
              diameter: "",
              shape: "\ue008",
              details: "",
              type: "Earth",
              primaryBody: "",
              moons: "",
              rings: "",
              enviroment: "",
              creator: "",
              description: "",
              notes: "",
              "onMap?": "Yes",
              population: "",
              shortName: obj.shortName,
              source: "",
              sphere: obj.sphere,
              website: "",
              sphereRadius: obj.sphereRadius,
            };
            planet.info = planetInfo;
          }
          planets.push(new Planet(planet));
        }
      } else if (!headers[j].includes("Orbit")) {
        obj[headers[j]] = currentLine[j];
      }
    }
    obj.planets = planets;
    spheres.push(new Sphere(obj));
  }
  return spheres;
}
