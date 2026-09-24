import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    color: '#333333',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  aboutMe: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  projectBlock: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  projectTech: {
    fontSize: 11,
    color: '#555555',
    marginLeft: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletIcon: {
    fontSize: 10,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    lineHeight: 1.4,
  },
  educationBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  educationDate: {
    fontSize: 10,
  },
  educationDetail: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
});

export const ResumePDF = () => {
  // Step 1: Create the Data Arrays based on live website content
  const codingProjects = [
    {
      title: 'FrameMind AI',
      tech: 'JavaScript, Expert Systems, AI',
      bullets: [
        'Live Demo: https://frame-mind-ai.vercel.app/',
        'A Rule-Based Expert System acting as an artificial Director of Photography.'
      ]
    },
    {
      title: 'Hospital Management System',
      tech: 'C++17, DSA, OOP',
      bullets: [
        'Live Demo: https://hms-project-ocofic7gj-madhav-sevaks-projects.vercel.app/',
        'A high-performance terminal system focusing on clean OOP principles.'
      ]
    },
    {
      title: 'Photobooth',
      tech: 'HTML, CSS, JavaScript',
      bullets: [
        'Live Demo: https://photobooth-madhav.vercel.app',
        'Created an interactive Photobooth web application featuring a highly stylized front-end built primarily with CSS.'
      ]
    },
    {
      title: 'Schedule Manager',
      tech: 'HTML, CSS, JavaScript',
      bullets: [
        'Live Demo: schedule-manager-two.vercel.app',
        'Developed a web-based Schedule Manager application using JavaScript to help users organize and track their daily tasks and events.'
      ]
    }
  ];

  const creativeProjects = [
    {
      title: 'Headphones — Lighting & Animation Study',
      tech: 'Blender, Lighting, Animation',
      bullets: [
        'A Blender practice project focused on lighting, camera movement, and animation using a pre-existing 3D headphones model. I worked on the lighting setup, camera animation, and overall visual presentation.'
      ]
    },
    {
      title: 'Chess Pawn Visualization',
      tech: 'Blender, 3D Modeling, Rendering',
      bullets: [
        'Modeled a detailed chess pawn in Blender using precision-based 3D modeling techniques. Applied materials, lighting, camera positioning, and rendering to create a realistic chessboard scene.',
        'View on ArtStation: madhav_sevak.artstation.com'
      ]
    },
    {
      title: 'Perfume Bottle Visualization',
      tech: 'Blender, 3D Modeling, Product Visualization',
      bullets: [
        'Designed and rendered a perfume bottle in Blender, focusing on product modeling, proportions, materials, studio lighting, and composition to create a professional product visualization.',
        'View on ArtStation: madhav_sevak.artstation.com'
      ]
    },
    {
      title: 'Cartoon Bird',
      tech: 'Blender, 3D Modeling, Character',
      bullets: [
        'A stylized 3D character visualization demonstrating organic modeling, vibrant materials, and cartoon-style rendering.'
      ]
    },
    {
      title: 'Low Poly Car Environment',
      tech: 'Blender, Low Poly, Environment',
      bullets: [
        'A low-poly 3D environment showcasing hard-surface modeling, composition, and atmospheric lighting.'
      ]
    }
  ];

  const skills = ['C Language', 'C++ Language', 'MYSQL', 'Blender', 'OPENGL'];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>MADHAV SEVAK</Text>
          <Text style={styles.subtitle}>B.Tech Computer Science & Engineering Student</Text>
          <Text style={styles.contact}>
            madhavsevak.work@gmail.com | github.com/MadhavSevak-work | madhav_sevak.artstation.com
          </Text>
        </View>

        {/* ABOUT ME Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT ME</Text>
          <Text style={styles.aboutMe}>
            B.Tech Computer Science & Engineering student at MIT World Peace University with a foundation in C, C++, SQL. Currently developing skills in Computer Graphics and 3D modeling using Blender and OPENGL. Interested in building practical projects, improving programming skills and exploring different areas of technology.
          </Text>
        </View>

        {/* PRACTICAL WORK Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRACTICAL WORK</Text>
          {codingProjects.map((project, index) => (
            <View key={index} style={styles.projectBlock}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectTech}> | {project.tech}</Text>
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

        {/* CREATIVE 3D WORK Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CREATIVE 3D WORK</Text>
          {creativeProjects.map((project, index) => (
            <View key={index} style={styles.projectBlock}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectTech}> | {project.tech}</Text>
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

        {/* EDUCATION Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <View style={styles.educationBlock}>
            <Text style={styles.educationTitle}>MIT World Peace University</Text>
            <Text style={styles.educationDate}>2024–2028</Text>
          </View>
          <Text style={styles.educationDetail}>• B.Tech Computer Science Engineering</Text>
        </View>

        {/* SKILLS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          {skills.map((skill, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.bulletIcon}>•</Text>
              <Text style={styles.bulletText}>{skill}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;
