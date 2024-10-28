// app/api/projects/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { projectId,clerkID, name,url, description, time } = await req.json();

    if (!clerkID || !projectId || !name || !url || !description || !time) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        clerkID,
        projectId,
        name,
        url,
        description,
        time,
      },
    });

    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to create project', error: error }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkID = searchParams.get("clerkID");

    // Ensure clerkID is provided
    if (!clerkID) {
      return NextResponse.json({ message: "clerkID is required" }, { status: 400 });
    }

    // Fetch the project by clerkID with selected fields
    const projects = await prisma.project.findMany({
      where: {
        clerkID: clerkID,
      },
      select: {
        name: true,
        description: true,
        url: true, // Fetch the `url` field and rename it to `link`
      },
    });

    // If no projects are found, return an error
    if (projects.length === 0) {
      return NextResponse.json({ message: "No projects found for this clerkID" }, { status: 404 });
    }

    // Format the project data to match the desired structure
    const formattedProjects = projects.map(project => ({
      title: project.name,
      description: project.description,
      link: project.url, // Rename `url` to `link`
    }));

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects by clerkID:", error);
    return NextResponse.json({ message: "Failed to fetch projects", error: error }, { status: 500 });
  }
}