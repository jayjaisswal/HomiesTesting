
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Hostel Curfew Reminder",
      content: "All residents must return by 11:00 PM",
      date: "2023-06-15",
    },
    {
      id: 2,
      title: "Water Maintenance",
      content: "No water supply from 9AM-3PM tomorrow",
      date: "2023-06-16",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) return;
    setNotices([
      {
        id: Date.now(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split("T")[0],
      },
      ...notices,
    ]);
    setNewNotice({ title: "", content: "" });
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EEE6FF 0%, #F5F0FF 100%)",
        padding: { xs: 2, sm: 4, md: 6, lg: 8 },
        pt: { xs: 10, sm: 12, md: 14 },
      }}
    >
      {/* Header with title and FAB aligned */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: { xs: 4, sm: 6, lg: 6 },
          alignItems: "center",
          mb: { xs: 4, sm: 6, lg: 8 },
          mx: "auto",
          maxWidth: "1000px",
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background: "linear-gradient(45deg, #4f46e5, #7c3aed)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
            textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Notice Board
        </Typography>

        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#4338ca" },
            boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)",
            zIndex: 1,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Notices List */}
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 4, lg: 5 },
        }}
      >
        {notices.map((notice) => (
          <Card
            key={notice.id}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, lg: 5 } }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#4f46e5",
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
                  mb: 2,
                }}
              >
                {notice.title}
              </Typography>
              <Typography
                sx={{
                  color: "#1f2937",
                  fontSize: { xs: "1rem", sm: "1.125rem", lg: "1.25rem" },
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {notice.content}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem", lg: "1.125rem" },
                  color: "#6b7280",
                  fontWeight: 500,
                }}
              >
                Posted: {notice.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Notice Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            width: { xs: "90%", sm: "80%", maxWidth: "600px" },
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#4f46e5",
            color: "white",
            py: 3,
            fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
            fontWeight: 700,
          }}
        >
          Add New Notice
        </DialogTitle>
        <DialogContent className="mt-6" sx={{ p: 3, pt: 4 }}>
          <TextField
            autoFocus
            label="Notice Title"
            fullWidth
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
            sx={{ mb: 3 }}
          />
          <TextField
            label="Notice Content"
            fullWidth
            multiline
            rows={4}
            value={newNotice.content}
            onChange={(e) =>
              setNewNotice({ ...newNotice, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#4f46e5" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddNotice}
            variant="contained"
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
              px: 3,
            }}
          >
            Post Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeBoard;
