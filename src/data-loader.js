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
  console.log("loading planets");
  let csv = await fetchCSV(data);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  //console.log(headers);
  let planets = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      //console.log(headers[j]);

      obj[headers[j]] = currentLine[j];
    }
    //console.log(obj);
    planets.push(obj);
  }
  //console.log(spheres);
  return planets;
}

export async function loadCSVFlows(data) {
  console.log("loading flows");
  let csv = await fetchCSV(data);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  //console.log(headers);
  let flows = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      //console.log(headers[j]);

      obj[headers[j]] = currentLine[j];
    }
    //console.log(obj);
    flows.push(new Flow(obj));
  }
  //console.log(spheres);
  return flows;
}

export async function loadCSVSpheres(sphereData, planetData) {
  console.log("loading spheres");

  let planetsDataArray = await loadCSVPlanets(planetData);

  let csv = await fetchCSV(sphereData);
  let lines = csv.split("\n");
  let headers = lines[0].split(";");
  //console.log(headers);
  let spheres = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let planets = [];
    let currentLine = lines[i].split(";");
    for (let j = 0; j < currentLine.length; j++) {
      //console.log(headers[j]);
      if (headers[j].includes("primaryBody")) {
        obj[headers[j]] = currentLine[j];
        let planet = {};
        planet.name = currentLine[j];
        planet.orbitRadius = "0";
        planet.orbitTrack = "I1";
        //find planetData for primary body
        let planetInfo = planetsDataArray.find((p) => p.name === planet.name);
        //console.log(planetInfo);
        if (planetInfo) {
          planet.info = planetInfo;
        } else if (
          planet.name &&
          obj["onMap?"] === "Yes" &&
          planet.name !== "Empty"
        ) {
          planetInfo = {
            name: planet.name,
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
          };
          planet.info = planetInfo;
          // console.log(planet.name, "from ", obj.shortName, " NOT FOUND");
        }
        planets.push(new Planet(planet));
      }
      if (headers[j].includes("Planet")) {
        if (currentLine[j]) {
          let planet = {};
          planet.name = currentLine[j];
          planet.orbitRadius = currentLine[j + 1];
          planet.orbitTrack = currentLine[j + 2];
          //find planetData for orbital bodies
          let planetInfo = planetsDataArray.find((p) => p.name === planet.name);
          if (planetInfo) {
            planet.info = planetInfo;
          } else if (planet.name === "Empty") {
          } else if (obj["onMap?"] === "Yes" && planet.name !== "Empty") {
            planetInfo = {
              name: planet.name,
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
            };
            planet.info = planetInfo;

            // console.log(planet.name, "from ", obj.shortName, " NOT FOUND");
          }
          planets.push(new Planet(planet));
        }
      } else if (!headers[j].includes("Orbit")) {
        obj[headers[j]] = currentLine[j];
      }
    }
    //console.log(obj);
    obj.planets = planets;
    spheres.push(new Sphere(obj));
  }
  //console.log(spheres);
  return spheres;
}
