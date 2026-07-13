import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `youssefOS - ${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview image: a youssefOS window on the desktop, generated at build
// time from the same profile data the site renders.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f7c72",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 920,
            padding: 8,
            backgroundColor: "#d4d0c8",
            borderTop: "4px solid #f4f2ec",
            borderLeft: "4px solid #f4f2ec",
            borderRight: "4px solid #46443f",
            borderBottom: "4px solid #46443f",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 56,
              paddingLeft: 20,
              paddingRight: 16,
              backgroundImage: "linear-gradient(90deg, #2c2e6b, #6f74d9)",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex" }}>youssefOS - readme.txt</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  width: 36,
                  height: 36,
                  backgroundColor: "#d4d0c8",
                  borderTop: "3px solid #f4f2ec",
                  borderLeft: "3px solid #f4f2ec",
                  borderRight: "3px solid #46443f",
                  borderBottom: "3px solid #46443f",
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: 36,
                  height: 36,
                  backgroundColor: "#d4d0c8",
                  borderTop: "3px solid #f4f2ec",
                  borderLeft: "3px solid #f4f2ec",
                  borderRight: "3px solid #46443f",
                  borderBottom: "3px solid #46443f",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 8,
              padding: "44px 48px",
              backgroundColor: "#fdfdf8",
              borderTop: "3px solid #87847c",
              borderLeft: "3px solid #87847c",
              borderRight: "3px solid #ffffff",
              borderBottom: "3px solid #ffffff",
              color: "#1d1d1a",
            }}
          >
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 34,
                color: "#5a5951",
              }}
            >
              {profile.role} - {profile.location}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 26,
                lineHeight: 1.5,
              }}
            >
              {profile.tagline}
            </div>
            <div style={{ display: "flex", marginTop: 32, gap: 14 }}>
              {["agentic ai", "machine learning", "backend"].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    padding: "8px 18px",
                    fontSize: 22,
                    backgroundColor: "#d4d0c8",
                    borderTop: "3px solid #f4f2ec",
                    borderLeft: "3px solid #f4f2ec",
                    borderRight: "3px solid #46443f",
                    borderBottom: "3px solid #46443f",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
