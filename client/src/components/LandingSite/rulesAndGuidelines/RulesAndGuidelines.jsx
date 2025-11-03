import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RuleIcon from "@mui/icons-material/Gavel";
import GuidelineIcon from "@mui/icons-material/ListAlt";
import WarningIcon from "@mui/icons-material/Warning";

const RulesAndGuidelines = () => {
  const [expanded, setExpanded] = useState("rules");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const hostelRules = [
    "Strict curfew at 11:00 PM for all residents",
    "No unauthorized guests in rooms after 9:00 PM",
    "Alcohol and smoking prohibited in hostel premises",
    "Lights out in common areas by midnight",
    "Damage to property will result in fines",
  ];

  const guidelines = [
    "Keep your room and common areas clean",
    "Report maintenance issues within 24 hours",
    "Conserve electricity and water",
    "Respect quiet hours (2:00 PM - 4:00 PM and 10:00 PM - 7:00 AM)",
  ];

  const penalties = [
    "First violation: Written warning",
    "Second violation: Rs. 500 fine",
    "Third violation: Rs. 1000 fine and parental notification",
    "Repeated violations: Termination of hostel accommodation",
  ];

  return (
    <Box sx={{ backgroundColor: "#f3e8ff", minHeight: "100vh", py: 12 }}>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#4f46e5", textAlign: "center" }}
        >
          Hostel Rules & Guidelines
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ mb: 4, color: "black", textAlign: "center" }}
        >
          All residents must adhere to the following rules and guidelines to
          maintain a safe and pleasant living environment.
        </Typography>

        {/* Rules Accordion */}
        <Accordion
          expanded={expanded === "rules"}
          onChange={handleChange("rules")}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#4f46e5" }} />}
          >
            <RuleIcon sx={{ color: "#4f46e5", mr: 2 }} />
            <Typography variant="h6" sx={{ color: "black" }}>
              Mandatory Rules
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {hostelRules.map((rule, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningIcon sx={{ color: "#4f46e5" }} />
                  </ListItemIcon>
                  <Typography sx={{ color: "black" }}>{rule}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Guidelines Accordion */}
        <Accordion
          expanded={expanded === "guidelines"}
          onChange={handleChange("guidelines")}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#4f46e5" }} />}
          >
            <GuidelineIcon sx={{ color: "#4f46e5", mr: 2 }} />
            <Typography variant="h6" sx={{ color: "black" }}>
              General Guidelines
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {guidelines.map((guideline, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <RuleIcon sx={{ color: "#4f46e5" }} />
                  </ListItemIcon>
                  <Typography sx={{ color: "black" }}>{guideline}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Penalties Accordion */}
        <Accordion
          expanded={expanded === "penalties"}
          onChange={handleChange("penalties")}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#4f46e5" }} />}
          >
            <WarningIcon sx={{ color: "#4f46e5", mr: 2 }} />
            <Typography variant="h6" sx={{ color: "black" }}>
              Penalties for Violations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {penalties.map((penalty, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Typography sx={{ color: "#4f46e5", fontWeight: "bold" }}>
                      {index + 1}.
                    </Typography>
                  </ListItemIcon>
                  <Typography sx={{ color: "black" }}>{penalty}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Typography
          variant="body2"
          sx={{
            mt: 4,
            fontStyle: "italic",
            color: "#4f46e5",
            textAlign: "center",
          }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default RulesAndGuidelines;
