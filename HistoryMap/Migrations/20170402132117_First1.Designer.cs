using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HistoryMap.Models;

namespace HistoryMap.Migrations
{
    [DbContext(typeof(ApplicationDb))]
    [Migration("20170402132117_First1")]
    partial class First1
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

            modelBuilder.Entity("HistoryMap.Models.Countries", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Centuries_Id");

                    b.Property<int?>("CenturyId");

                    b.Property<string>("Details")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CenturyId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("HistoryMap.Models.Countries", b =>
                {
                    b.HasOne("HistoryMap.Models.Centuries", "Century")
                        .WithMany("Countries")
                        .HasForeignKey("CenturyId");
                });
        }
    }
}
