using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HistoryMap.Models;

namespace HistoryMap.Migrations
{
    [DbContext(typeof(ApplicationDb))]
    [Migration("20170402032452_First")]
    partial class First
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HistoryMap.Models.Centuries", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Century");

                    b.Property<byte[]>("Data")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Centuries");
                });
        }
    }
}
