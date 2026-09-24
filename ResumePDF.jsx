import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Create modernized, unique styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  // Sidebar Styles (Left Column)
  sidebar: {
    width: '35%',
    backgroundColor: '#1E2A38',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: 11,
    color: '#8BA0B8',
    marginBottom: 30,
    lineHeight: 1.4,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.2,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#3A4A5A',
  },
  contactText: {
    fontSize: 9,
    color: '#D0D8E0',
    marginBottom: 8,
    lineHeight: 1.4,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  educationSchool: {
    fontSize: 9,
    color: '#D0D8E0',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 9,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: '#3A4A5A',
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  // Main Content Styles (Right Column)
  main: {
    width: '65%',
    padding: 30,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  mainSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E2A38',
    letterSpacing: 1,
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#F0F4F8',
  },
  aboutMe: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#4A5568',
    marginBottom: 20,
  },
  projectBlock: {
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E2A38',
  },
  projectTech: {
    fontSize: 9,
    color: '#4A90E2',
    fontWeight: 'bold',
    backgroundColor: '#F0F4F8',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletIcon: {
    fontSize: 10,
    marginRight: 6,
    color: '#A0AEC0',
  },
  bulletText: {
    fontSize: 9.5,
    flex: 1,
    lineHeight: 1.5,
    color: '#4A5568',
  },
});

export const ResumePDF = () => {
  const codingProjects = [
    {
      title: 'FrameMind AI',
      tech: 'JavaScript, AI',
      bullets: [
        'Live Demo: https://frame-mind-ai.vercel.app/',
        'A Rule-Based Expert System acting as an artificial Director of Photography.'
      ]
    },
    {
      title: 'Hospital Management',
      tech: 'C++17, DSA, OOP',
      bullets: [
        'Live Demo: https://hms-project-ocofic7gj-madhav-sevaks-projects.vercel.app/',
        'A high-performance terminal system focusing on clean OOP principles.'
      ]
    },
    {
      title: 'Photobooth',
      tech: 'HTML, CSS, JS',
      bullets: [
        'Live Demo: https://photobooth-madhav.vercel.app',
        'Created an interactive Photobooth web application featuring a highly stylized front-end built primarily with CSS.'
      ]
    },
    {
      title: 'Schedule Manager',
      tech: 'HTML, CSS, JS',
      bullets: [
        'Live Demo: schedule-manager-two.vercel.app',
        'Developed a web-based Schedule Manager application using JavaScript to help users organize and track daily tasks.'
      ]
    }
  ];

  const creativeProjects = [
    {
      title: 'Headphones Animation',
      tech: 'Blender, Lighting',
      bullets: [
        'A Blender practice project focused on lighting, camera movement, and animation using a pre-existing 3D headphones model.'
      ]
    },
    {
      title: 'Chess Pawn Visualization',
      tech: '3D Modeling, Rendering',
      bullets: [
        'Modeled a detailed chess pawn using precision-based 3D techniques. Applied materials, lighting, and rendering to create a realistic scene.',
        'View on ArtStation: madhav_sevak.artstation.com'
      ]
    },
    {
      title: 'Perfume Bottle',
      tech: 'Product Visualization',
      bullets: [
        'Designed and rendered a perfume bottle in Blender, focusing on proportions, materials, studio lighting, and professional composition.',
      ]
    },
    {
      title: 'Low Poly Car Environment',
      tech: 'Low Poly, Environment',
      bullets: [
        'A low-poly 3D environment showcasing hard-surface modeling, composition, and atmospheric lighting.'
      ]
    }
  ];

  const skills = ['C', 'C++', 'MySQL', 'Blender', 'OpenGL', 'JavaScript', 'HTML/CSS'];

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* SIDEBAR (Left Column) */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>MADHAV{'\n'}SEVAK</Text>
          <Text style={styles.subtitle}>B.Tech Computer Science &{'\n'}Engineering Student</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>CONTACT</Text>
            <Text style={styles.contactText}>madhavsevak.work@gmail.com</Text>
            <Text style={styles.contactText}>github.com/MadhavSevak-work</Text>
            <Text style={styles.contactText}>madhav_sevak.artstation.com</Text>
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>EDUCATION</Text>
            <Text style={styles.educationDegree}>B.Tech Computer Science</Text>
            <Text style={styles.educationSchool}>MIT World Peace University</Text>
            <Text style={styles.educationDate}>2024 – 2028</Text>
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillPill}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* MAIN CONTENT (Right Column) */}
        <View style={styles.main}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.mainSectionTitle}>PROFILE</Text>
            <Text style={styles.aboutMe}>
              B.Tech Computer Science & Engineering student with a strong foundation in C, C++, and SQL. Currently developing specialized skills in Computer Graphics and 3D modeling using Blender and OpenGL. Passionate about bridging technical logic with visual creativity through practical projects and continuous learning.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.mainSectionTitle}>SOFTWARE DEVELOPMENT</Text>
            {codingProjects.map((project, index) => (
              <View key={index} style={styles.projectBlock}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectTech}>{project.tech}</Text>
                </View>
                {project.bullets.map((bullet, bIndex) => (
                  <View key={bIndex} style={styles.bulletPoint}>
                    <Text style={styles.bulletIcon}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.mainSectionTitle}>CREATIVE 3D WORK</Text>
            {creativeProjects.map((project, index) => (
              <View key={index} style={styles.projectBlock}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectTech}>{project.tech}</Text>
                </View>
                {project.bullets.map((bullet, bIndex) => (
                  <View key={bIndex} style={styles.bulletPoint}>
                    <Text style={styles.bulletIcon}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;

export const ResumeButtons = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleView = async () => {
    setIsViewing(true);
    try {
      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsViewing(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Madhav_Sevak_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="cta-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button onClick={handleDownload} disabled={isDownloading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {isDownloading ? 'Generating...' : 'Download Resume'}
      </button>
      <button onClick={handleView} disabled={isViewing} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {isViewing ? 'Generating...' : 'View Resume'}
      </button>
    </div>
  );
};